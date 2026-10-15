#!/usr/bin/env node
import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import {
  GoogleNewsSearchArgs,
  isValidGoogleNewsSearchArgs,
  NewsArticle,
  NewsCategory,
  FormattedNewsResponse,
  MenuLink
} from './types.js';

// SerpAPI配置
const SERP_API_KEY = process.env.SERP_API_KEY;
const SERP_API_BASE_URL = 'https://serpapi.com/search';

class GoogleNewsServer {
  private server: Server;
  private axiosInstance: import('axios').AxiosInstance;

  constructor() {
    if (!process.env.SERP_API_KEY) {
      throw new Error('SERP_API_KEY environment variable is required');
    }

    this.server = new Server(
      { name: 'google-news-server', version: '1.0.1' },
      { capabilities: { tools: {} } }
    );

    this.axiosInstance = axios.create({
      baseURL: SERP_API_BASE_URL,
    });

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    // 注册可用工具
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'google_news_search',
          description: 'Search Google News for articles and news content. Results will be automatically categorized by topic.',
          inputSchema: {
            type: 'object',
            properties: {
              q: {
                type: 'string',
                description: 'Search query',
              },
              gl: {
                type: 'string',
                description: 'Country code (e.g., us, uk)',
                default: 'us'
              },
              hl: {
                type: 'string',
                description: 'Language code (e.g., en)',
                default: 'en'
              },
              topic_token: {
                type: 'string',
                description: 'Topic token for specific news topics',
              },
              publication_token: {
                type: 'string',
                description: 'Publication token for specific publishers',
              },
              story_token: {
                type: 'string',
                description: 'Story token for full coverage of a story',
              },
              section_token: {
                type: 'string',
                description: 'Section token for specific sections',
              },
            },
          },
        },
      ],
    }));

    // 处理工具调用
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === 'google_news_search') {
        if (!isValidGoogleNewsSearchArgs(args)) {
          throw new McpError(
            ErrorCode.InvalidParams,
            'Invalid arguments for google_news_search'
          );
        }

        const params = {
          ...args,
          engine: 'google_news',
          api_key: SERP_API_KEY,
          gl: args.gl || 'us',
          hl: args.hl === 'zh' ? 'en' : (args.hl || 'en')
        };

        try {
          const response = await this.axiosInstance.get('', { params });
          const formattedResults = this.formatNewsResults(response.data);
          const resultText = this.formatResponseText(formattedResults);

          return {
            content: [{
              type: 'text',
              text: resultText
            }]
          };
        } catch (error) {
          return {
            isError: true,
            content: [{
              type: 'text',
              text: this.getErrorMessage(error)
            }]
          };
        }
      }

      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
    });
  }

  private formatNewsResults(data: any): FormattedNewsResponse {
    const newsResults = data.news_results || [];
    const menuLinks = data.menu_links || [];
    const categories = new Map<string, NewsArticle[]>();
    
    // 根据内容分类整理新闻
    newsResults.forEach((result: any) => {
      let category = 'General';
      
      // 通过标题和内容关键词判断分类
      const titleAndSnippet = (result.title + ' ' + (result.snippet || '')).toLowerCase();
      
      if (titleAndSnippet.match(/ai|artificial intelligence|machine learning|deep learning/)) {
        category = 'AI & Technology';
      } else if (titleAndSnippet.match(/business|economy|market|finance/)) {
        category = 'Business';
      } else if (titleAndSnippet.match(/science|research|study|discovery/)) {
        category = 'Science & Research';
      } else if (titleAndSnippet.match(/health|medical|disease|treatment/)) {
        category = 'Healthcare';
      }
      
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      
      categories.get(category)?.push({
        title: result.title,
        source: result.source.name,
        link: result.link,
        date: result.date,
        snippet: result.snippet,
        authors: result.source.authors
      });
    });
    
    // 转换为最终格式
    const formattedCategories: NewsCategory[] = Array.from(categories.entries())
      .map(([name, articles]) => ({
        name,
        articles: articles.sort((a, b) => {
          // 按日期降序排序
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        })
      }));

    return {
      categories: formattedCategories,
      menu_links: menuLinks,
      timestamp: new Date().toISOString()
    };
  }

  private formatResponseText(formattedResults: FormattedNewsResponse): string {
    const categoryTexts = formattedResults.categories
      .map(category => {
        const articlesList = category.articles
          .map(article => {
            let text = `- ${article.title}\n`;
            text += `  Source: ${article.source}\n`;
            if (article.authors?.length) {
              text += `  Authors: ${article.authors.join(', ')}\n`;
            }
            if (article.snippet) {
              text += `  Summary: ${article.snippet}\n`;
            }
            if (article.date) {
              text += `  Date: ${article.date}\n`;
            }
            text += `  Link: ${article.link}`;
            return text;
          })
          .join('\n\n');
          
        return `${category.name} (${category.articles.length} articles):\n${articlesList}`;
      })
      .join('\n\n' + '='.repeat(80) + '\n\n');

    return categoryTexts;
  }

  private getErrorMessage(error: any): string {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.error === "Unsupported `zh` interface language - hl parameter.") {
        return "抱歉，Google News API 暂不支持中文界面。已自动切换为英文显示。";
      }
      return `API 错误: ${error.response?.data?.error || error.message}`;
    }
    return `未知错误: ${error.message || '请稍后重试'}`;
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// 创建并启动服务器
const server = new GoogleNewsServer();
server.run().catch(console.error);