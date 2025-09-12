// GEO (Generative Engine Optimization) Metrics and Monitoring
export interface GEOMetrics {
  // Citation success rate - percentage of successful tool calls
  citationSuccessRate: number;
  
  // AI traffic conversion rate - percentage of AI agents that successfully use the tool
  aiTrafficConversionRate: number;
  
  // Average citation position - where the tool is typically referenced in AI responses
  averageCitationPosition: number;
  
  // Link carry rate - percentage of responses that include source links
  linkCarryRate: number;
  
  // Query coverage rate - percentage of queries that return relevant results
  queryCoverageRate: number;
  
  // Tool call success rate - percentage of successful MCP tool calls
  toolCallSuccessRate: number;
  
  // Average response time in milliseconds
  averageResponseTime: number;
  
  // Error rate - percentage of failed requests
  errorRate: number;
  
  // Categorization accuracy - percentage of correctly categorized news
  categorizationAccuracy: number;
  
  // AI agent satisfaction score (1-10)
  aiAgentSatisfactionScore: number;
  
  // Usage frequency - number of tool calls per day
  usageFrequency: number;
  
  // Query diversity - number of unique query patterns
  queryDiversity: number;
}

export interface GEOMonitoringConfig {
  trackingEnabled: boolean;
  metricsEndpoint: string;
  reportingInterval: number; // minutes
  alertThresholds: {
    errorRate: number;
    responseTime: number;
    successRate: number;
    satisfactionScore: number;
  };
  dataRetentionDays: number;
}

export interface QueryMetrics {
  query: string;
  timestamp: Date;
  success: boolean;
  responseTime: number;
  resultCount: number;
  categories: string[];
  errorMessage?: string;
}

export interface AgentMetrics {
  agentId: string;
  toolCalls: number;
  successfulCalls: number;
  averageResponseTime: number;
  lastActive: Date;
  preferredCategories: string[];
}

export class GEOMetricsCollector {
  private metrics: GEOMetrics;
  private queryHistory: QueryMetrics[];
  private agentHistory: Map<string, AgentMetrics>;
  private config: GEOMonitoringConfig;

  constructor(config: GEOMonitoringConfig) {
    this.config = config;
    this.metrics = this.initializeMetrics();
    this.queryHistory = [];
    this.agentHistory = new Map();
  }

  private initializeMetrics(): GEOMetrics {
    return {
      citationSuccessRate: 0,
      aiTrafficConversionRate: 0,
      averageCitationPosition: 0,
      linkCarryRate: 0,
      queryCoverageRate: 0,
      toolCallSuccessRate: 0,
      averageResponseTime: 0,
      errorRate: 0,
      categorizationAccuracy: 0,
      aiAgentSatisfactionScore: 0,
      usageFrequency: 0,
      queryDiversity: 0
    };
  }

  public trackToolCall(
    query: string,
    success: boolean,
    responseTime: number,
    resultCount: number,
    categories: string[],
    agentId?: string,
    errorMessage?: string
  ): void {
    if (!this.config.trackingEnabled) return;

    const queryMetric: QueryMetrics = {
      query,
      timestamp: new Date(),
      success,
      responseTime,
      resultCount,
      categories,
      errorMessage
    };

    this.queryHistory.push(queryMetric);

    // Update agent metrics
    if (agentId) {
      this.updateAgentMetrics(agentId, success, responseTime, categories);
    }

    // Update overall metrics
    this.updateOverallMetrics();
  }

  private updateAgentMetrics(
    agentId: string,
    success: boolean,
    responseTime: number,
    categories: string[]
  ): void {
    const existing = this.agentHistory.get(agentId) || {
      agentId,
      toolCalls: 0,
      successfulCalls: 0,
      averageResponseTime: 0,
      lastActive: new Date(),
      preferredCategories: []
    };

    existing.toolCalls++;
    if (success) {
      existing.successfulCalls++;
    }
    existing.averageResponseTime = 
      (existing.averageResponseTime * (existing.toolCalls - 1) + responseTime) / existing.toolCalls;
    existing.lastActive = new Date();
    
    // Update preferred categories
    categories.forEach(cat => {
      if (!existing.preferredCategories.includes(cat)) {
        existing.preferredCategories.push(cat);
      }
    });

    this.agentHistory.set(agentId, existing);
  }

  private updateOverallMetrics(): void {
    const recentQueries = this.getRecentQueries(24); // Last 24 hours
    
    this.metrics.toolCallSuccessRate = this.calculateSuccessRate(recentQueries);
    this.metrics.averageResponseTime = this.calculateAverageResponseTime(recentQueries);
    this.metrics.errorRate = 1 - this.metrics.toolCallSuccessRate;
    this.metrics.queryCoverageRate = this.calculateQueryCoverageRate(recentQueries);
    this.metrics.queryDiversity = this.calculateQueryDiversity(recentQueries);
    this.metrics.usageFrequency = recentQueries.length;
    this.metrics.categorizationAccuracy = this.calculateCategorizationAccuracy(recentQueries);
    this.metrics.linkCarryRate = this.calculateLinkCarryRate(recentQueries);
    this.metrics.aiTrafficConversionRate = this.calculateAITrafficConversionRate();
  }

  private getRecentQueries(hours: number): QueryMetrics[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.queryHistory.filter(q => q.timestamp >= cutoff);
  }

  private calculateSuccessRate(queries: QueryMetrics[]): number {
    if (queries.length === 0) return 0;
    const successful = queries.filter(q => q.success).length;
    return successful / queries.length;
  }

  private calculateAverageResponseTime(queries: QueryMetrics[]): number {
    if (queries.length === 0) return 0;
    const totalTime = queries.reduce((sum, q) => sum + q.responseTime, 0);
    return totalTime / queries.length;
  }

  private calculateQueryCoverageRate(queries: QueryMetrics[]): number {
    if (queries.length === 0) return 0;
    const queriesWithResults = queries.filter(q => q.resultCount > 0).length;
    return queriesWithResults / queries.length;
  }

  private calculateQueryDiversity(queries: QueryMetrics[]): number {
    const uniqueQueries = new Set(queries.map(q => q.query.toLowerCase().trim()));
    return uniqueQueries.size;
  }

  private calculateCategorizationAccuracy(queries: QueryMetrics[]): number {
    // This would need to be implemented based on feedback or validation
    // For now, return a placeholder value
    return 0.85; // 85% accuracy placeholder
  }

  private calculateLinkCarryRate(queries: QueryMetrics[]): number {
    // This would need to be tracked based on how AI agents use the results
    // For now, return a placeholder value
    return 0.75; // 75% link carry rate placeholder
  }

  private calculateAITrafficConversionRate(): number {
    const totalAgents = this.agentHistory.size;
    const activeAgents = Array.from(this.agentHistory.values())
      .filter(agent => {
        const hoursSinceLastActive = (Date.now() - agent.lastActive.getTime()) / (1000 * 60 * 60);
        return hoursSinceLastActive < 24;
      }).length;
    
    return totalAgents > 0 ? activeAgents / totalAgents : 0;
  }

  public getMetrics(): GEOMetrics {
    return { ...this.metrics };
  }

  public getAgentMetrics(agentId: string): AgentMetrics | undefined {
    return this.agentHistory.get(agentId);
  }

  public getAllAgentMetrics(): AgentMetrics[] {
    return Array.from(this.agentHistory.values());
  }

  public generateReport(): string {
    const metrics = this.getMetrics();
    const agents = this.getAllAgentMetrics();
    
    return `
# GEO Metrics Report - ${new Date().toISOString()}

## Overall Performance
- Tool Call Success Rate: ${(metrics.toolCallSuccessRate * 100).toFixed(2)}%
- Average Response Time: ${metrics.averageResponseTime.toFixed(2)}ms
- Error Rate: ${(metrics.errorRate * 100).toFixed(2)}%
- Query Coverage Rate: ${(metrics.queryCoverageRate * 100).toFixed(2)}%

## Usage Statistics
- Daily Usage Frequency: ${metrics.usageFrequency} calls
- Query Diversity: ${metrics.queryDiversity} unique queries
- Active AI Agents: ${agents.length}
- AI Traffic Conversion Rate: ${(metrics.aiTrafficConversionRate * 100).toFixed(2)}%

## Quality Metrics
- Categorization Accuracy: ${(metrics.categorizationAccuracy * 100).toFixed(2)}%
- Link Carry Rate: ${(metrics.linkCarryRate * 100).toFixed(2)}%
- AI Agent Satisfaction Score: ${metrics.aiAgentSatisfactionScore.toFixed(2)}/10

## Top Agent Activity
${agents
  .sort((a, b) => b.toolCalls - a.toolCalls)
  .slice(0, 5)
  .map(agent => `- ${agent.agentId}: ${agent.toolCalls} calls, ${(agent.averageResponseTime).toFixed(2)}ms avg`)
  .join('\n')}
    `.trim();
  }

  public shouldAlert(): boolean {
    const metrics = this.getMetrics();
    const thresholds = this.config.alertThresholds;
    
    return (
      metrics.errorRate > thresholds.errorRate ||
      metrics.averageResponseTime > thresholds.responseTime ||
      metrics.toolCallSuccessRate < thresholds.successRate ||
      metrics.aiAgentSatisfactionScore < thresholds.satisfactionScore
    );
  }

  public cleanup(): void {
    const cutoff = new Date(Date.now() - this.config.dataRetentionDays * 24 * 60 * 60 * 1000);
    this.queryHistory = this.queryHistory.filter(q => q.timestamp >= cutoff);
    
    // Clean up inactive agents
    for (const [agentId, agent] of this.agentHistory.entries()) {
      const hoursSinceLastActive = (Date.now() - agent.lastActive.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastActive > 24 * 7) { // 7 days
        this.agentHistory.delete(agentId);
      }
    }
  }
}
