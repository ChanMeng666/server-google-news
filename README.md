[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/chanmeng666-server-google-news-badge.png)](https://mseep.ai/app/chanmeng666-server-google-news)

<div align="center">
 <h1><img src="public/server-google-news.svg" width="80px"><br/>Google News MCP Server</h1>
 <a href="https://github.com/ChanMeng666/server-google-news/stargazers"><img src="https://img.shields.io/github/stars/ChanMeng666/server-google-news.svg?style=social"></a>
 <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/MCP-Server-blue?style=flat"/>
 <img src="https://img.shields.io/badge/License-MIT-brightgreen?style=flat"/>
</div>

<br/>

<div align="center">
  <a href="https://www.pulsemcp.com/servers/chanmeng666-google-news"><img src="https://www.pulsemcp.com/badge/top-pick/chanmeng666-google-news" width="400" alt="PulseMCP Badge"></a>
</div>


<br/>

A Model Context Protocol (MCP) server implementation that provides Google News search capabilities via SerpAPI integration. Automatically categorizes news results and supports multiple languages and regions.

<a href="https://glama.ai/mcp/servers/dbx6imq4ef"><img width="380" height="200" src="https://glama.ai/mcp/servers/dbx6imq4ef/badge" alt="Google News Server MCP server" /></a>

<br/>

[![👉Try It Now!👈](https://gradient-svg-generator.vercel.app/api/svg?text=%F0%9F%91%89Try%20It%20Now!%F0%9F%91%88&color=000000&height=60&gradientType=radial&duration=6s&color0=ffffff&template=pride-rainbow)](https://smithery.ai/server/@chanmeng666/google-news-server)

<br/>

https://github.com/user-attachments/assets/1cc71c27-f840-4c94-9ab5-460d84ba4779


![屏幕截图 2024-12-30 021446](https://github.com/user-attachments/assets/34985fac-a529-4aac-a77d-b0b93f70d0f7)

![屏幕截图 2024-12-30 021524](https://github.com/user-attachments/assets/6d1d3069-db04-421e-83b9-6ecdbce4847e)

![屏幕截图 2024-12-30 021914](https://github.com/user-attachments/assets/16889a09-c05d-47dc-b3fe-5ea3771e059d)

![屏幕截图 2024-12-30 021941](https://github.com/user-attachments/assets/da20e7a6-f2e8-4aec-bab9-f19322d0f798)


# ✨ Features

### 🔍 Flexible Search Options
Comprehensive search capabilities including query-based search, topic search, publication filtering and story coverage.

### 🌐 Global Coverage
Supports multiple languages and regions through configurable language and country codes.

### 📊 Smart Categorization 
Automatically categorizes news results into topics like AI & Technology, Business, Science & Research, and Healthcare.

### 🔀 Multiple Result Types
Handles various news result types including headlines, stories, related topics and menu links.

### 🛠️ Robust Error Handling
Comprehensive error handling for API failures and invalid inputs, with helpful error messages.

### 🌍 Language Support
Automatic fallback to English for unsupported language codes with appropriate user notifications.

# 🔑 SerpApi Setup Guide

Before getting started, you'll need to obtain a SerpApi key. Here's how:

1. Visit [SerpApi website](https://serpapi.com/) and create an account

2. After registration, go to your Dashboard:
   - Locate the "API Key" section
   - Copy your API key
   - New users get 250 free API calls

3. API Usage Details:
   - Free tier: 250 searches per month
   - Paid plans start at $75/month for 5000 searches
   - Billing based on successful API calls
   - Multiple payment methods: Credit Card, PayPal, etc.

4. Usage Limits:
   - Request Rate: 2 requests/second
   - IP Restrictions: None
   - Concurrent Requests: 5
   - Response Cache Time: 1 hour

# 👩‍🔧 Solution for MCP Servers Connection Issues with NVM/NPM

Click to view my configuration solution 👉 https://github.com/modelcontextprotocol/servers/issues/76

# 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Configure environment:
Modify your `claude_desktop_config.json` with the following content (adjust paths according to your system):
```json
    "google-news": {
      "command": "D:\\Program\\nvm\\node.exe",
      "args": [
        "D:\\github_repository\\path_to\\dist\\index.js"
      ],
      "env": {
        "SERP_API_KEY": "your-api-key"
      }
    }
```

4. Start the server:
```bash
npm start
```

## Troubleshooting

1. Invalid API Key
- Verify API key configuration in `claude_desktop_config.json`
- Confirm API key is active in SERP API dashboard

2. Request Failures
- Check network connectivity
- Verify API call quota hasn't been exceeded
- Validate request parameter format



## Running evals

The evals package loads an mcp client that then runs the index.ts file, so there is no need to rebuild between tests. You can load environment variables by prefixing the npx command. Full documentation can be found [here](https://www.mcpevals.io/docs).

```bash
OPENAI_API_KEY=your-key  npx mcp-eval src/evals/evals.ts src/index.ts
```
# 📦 Installation

## Installing via Smithery

To install Google News for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@chanmeng666/google-news-server):

```bash
npx -y @smithery/cli install @chanmeng666/google-news-server --client claude
```

[![Trust Score](https://archestra.ai/mcp-catalog/api/badge/quality/ChanMeng666/server-google-news)](https://archestra.ai/mcp-catalog/chanmeng666__server-google-news)
[![smithery badge](https://smithery.ai/badge/@chanmeng666/google-news-server)](https://smithery.ai/server/@chanmeng666/google-news-server)

## Installing via mcp-get

```bash
npx @michaellatman/mcp-get@latest install @chanmeng666/google-news-server
```

> If you are using an old version of Windows PowerShell, you may need to run `Set-ExecutionPolicy Bypass -Scope Process` before this command.

## Manual Installation

<img src="https://cdn.simpleicons.org/npm/CB3837" height="14"/> <a href="https://www.npmjs.com/package/@chanmeng666/google-news-server">@chanmeng666/google-news-server</a>

```bash
# Using npm
npm i @chanmeng666/google-news-server
# or
npm install @chanmeng666/google-news-server

# Using yarn
yarn add @chanmeng666/google-news-server

# Using pnpm
pnpm add @chanmeng666/google-news-server
```

# 💻 Tech Stack
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MCP](https://img.shields.io/badge/MCP-SDK-blue?style=for-the-badge)

# 📖 API Documentation

The server implements the Model Context Protocol and exposes a Google News search tool with the following parameters:

- `q`: Search query string
- `gl`: Country code (e.g., 'us', 'uk')
- `hl`: Language code (e.g., 'en', 'es')
- `topic_token`: Token for specific news topics
- `publication_token`: Token for specific publishers
- `story_token`: Token for full coverage of a story
- `section_token`: Token for specific sections

# 🔧 Development

```bash
# Run in development mode with hot reload
npm run dev

# Run linting
npm run lint

# Run tests
npm run test
```

# 📝 License

This project is [MIT licensed](./LICENSE).

# 🙋‍♀ Author

Created and maintained by [Chan Meng](https://chanmeng.org/).
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=normal&logo=github&logoColor=white)](https://github.com/ChanMeng666)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=normal&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chanmeng666/)

---

<details>
<summary>🤖 AI Agent Instructions & GEO Optimization</summary>

## For AI Agents and LLM Crawlers

This MCP server is optimized for AI agent usage with comprehensive instructions and structured data.

### Quick AI Usage Guide

```json
{
  "tool": "google_news_search",
  "parameters": {
    "q": "artificial intelligence latest developments",
    "gl": "us",
    "hl": "en"
  }
}
```

### AI-Friendly Features
- **Automatic Categorization**: News results are automatically sorted into relevant categories
- **Structured Output**: Returns formatted data optimized for AI processing
- **Multi-language Support**: Supports various languages with automatic fallbacks
- **Error Handling**: Comprehensive error messages and graceful degradation

### Response Format
The server returns categorized news with the following structure:
- **Categories**: AI & Technology, Business, Science & Research, Healthcare, General
- **Article Fields**: title, source, link, date, snippet, authors
- **Metadata**: timestamp, menu_links for related topics

### Best Practices for AI Agents
1. Use specific, descriptive keywords for better results
2. Leverage automatic categorization for topic-based workflows
3. Implement proper error handling and retry logic
4. Respect API rate limits (2 requests/second)
5. Parse structured responses for better context understanding

### Advanced Usage Patterns
- **News Monitoring**: Use company names or stock symbols for business news
- **Research Exploration**: Leverage topic tokens for field-specific searches
- **Breaking News**: Use "breaking news" or "latest news" queries
- **Multi-language**: Combine appropriate gl and hl parameters

### Error Handling
- Invalid API key: Check SERP_API_KEY environment variable
- Unsupported language: Server auto-falls back to English
- Rate limiting: Respect 2 requests/second limit
- Invalid parameters: Validate parameter types before calling

For detailed AI agent instructions, see [AI_INSTRUCTIONS.md](./AI_INSTRUCTIONS.md).

</details>

<details>
<summary>📊 GEO Metrics & Monitoring</summary>

## Generative Engine Optimization (GEO) Features

This server includes comprehensive monitoring and optimization for AI agent usage.

### Key Metrics Tracked
- **Citation Success Rate**: Percentage of successful tool calls
- **AI Traffic Conversion Rate**: Percentage of AI agents successfully using the tool
- **Query Coverage Rate**: Percentage of queries returning relevant results
- **Response Time**: Average response time for tool calls
- **Categorization Accuracy**: Accuracy of automatic news categorization
- **Link Carry Rate**: Percentage of responses including source links

### Monitoring Configuration
```typescript
interface GEOMonitoringConfig {
  trackingEnabled: boolean;
  metricsEndpoint: string;
  reportingInterval: number; // minutes
  alertThresholds: {
    errorRate: number;
    responseTime: number;
    successRate: number;
    satisfactionScore: number;
  };
}
```

### Performance Optimization
- Real-time metrics collection
- Automated alerting for performance issues
- Query pattern analysis for optimization
- Agent usage tracking and analytics

### Data-Driven Improvements
- Continuous monitoring of AI agent satisfaction
- Query success rate analysis
- Response time optimization
- Categorization accuracy improvements

For technical implementation details, see [src/geo-metrics.ts](./src/geo-metrics.ts).

</details>

<details>
<summary>🔍 Structured Data & Metadata</summary>

## AI-Optimized Metadata

This server provides comprehensive structured data for AI agents and search engines.

### JSON-LD Structured Data
The server includes structured data following Schema.org standards:
- Software application metadata
- Feature descriptions and capabilities
- Technical requirements and dependencies
- Usage patterns and integration guidelines

### MCP Protocol Compliance
- **Protocol Version**: 1.0.0
- **Tool Name**: `google_news_search`
- **Response Format**: Structured text with categorized results
- **Rate Limits**: 2 requests/second, 5 concurrent requests

### AI Discovery Features
- **llms.txt**: Comprehensive AI usage guide at root level
- **Structured Metadata**: Enhanced manifest.json with AI-specific information
- **Error Handling**: AI-friendly error messages and fallbacks
- **Documentation**: Detailed usage examples and best practices

### Integration Guidelines
- Designed for seamless integration with other MCP servers
- Optimized for AI agent workflows
- Supports various AI platforms and frameworks
- Provides clear error handling and debugging information

For complete structured data, see [structured-data.json](./structured-data.json).

</details>

