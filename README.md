<div align="center">

<img src="./public/server-google-news.svg" width="80" alt="">

# Google News MCP Server

### Live news for your AI assistant.

Ask Claude about today's news. It searches Google News and answers with real articles, sorted by topic.

<a href="https://www.npmjs.com/package/@chanmeng666/google-news-server"><img src="./.github/readme/pill-npm.svg" height="40" alt="npm"></a> <a href="https://serpapi.com/"><img src="./.github/readme/pill-get-a-serpapi-key.svg" height="40" alt="Get a SerpApi key"></a> <a href="docs/overview.md"><img src="./.github/readme/pill-full-overview.svg" height="40" alt="Full overview"></a>

</div>

<br>

<a href="https://www.npmjs.com/package/@chanmeng666/google-news-server"><img src="./.github/readme/card.svg" width="100%" alt="Google News MCP Server, an open-source Model Context Protocol server that lets AI assistants such as Claude search live Google News. The card shows a chat calling its one tool, google_news_search, and the answer arriving as article cards sorted into 5 topics (AI & Technology, Business, Science & Research, Healthcare, General), which regroup as the country and language codes change across 10 languages."></a>

<br>

https://github.com/user-attachments/assets/1cc71c27-f840-4c94-9ab5-460d84ba4779

<br>

## Try it

Get a key from [SerpApi](https://serpapi.com/), then add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "google-news": {
      "command": "npx",
      "args": ["-y", "@chanmeng666/google-news-server"],
      "env": { "SERP_API_KEY": "your-api-key" }
    }
  }
}
```

Restart Claude and ask:

> *What happened in AI this week?*

## Why use it

- **One tool to learn.** `google_news_search` takes a query and returns each article's title, source, date, summary and link.
- **Sorted before it reaches the model.** Articles arrive grouped as AI & Technology, Business, Science & Research, Healthcare or General, newest first.
- **Any country.** Set the `gl` and `hl` codes to search another country's news or another language.

```mermaid
flowchart LR
    Q([Your question]) --> C[Claude calls<br/>google_news_search]
    C --> S[SerpApi<br/>Google News]
    S --> G[Server groups<br/>articles by topic]
    G --> A([Answer with<br/>sources and links])
```

## For your agent

This page is all a person needs. Everything else is written for agents: clone the repo and point yours at [`llms.txt`](llms.txt) and [`docs/overview.md`](docs/overview.md).

```bash
git clone https://github.com/ChanMeng666/server-google-news
```

<sub>[Full overview](docs/overview.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [MIT](LICENSE)</sub>

<sub>See also: [Google Jobs MCP Server](https://github.com/ChanMeng666/server-google-jobs). Built by [Chan Meng](https://github.com/ChanMeng666).</sub>
