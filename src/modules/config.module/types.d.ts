declare namespace fastify {
  export interface ProxyTarget {
    url: string;
    prefix: string;
    rewritePrefix: string;
  }

  export const configModule: {
    memoryProfilerEnabled: boolean;
    serverPort: number | string;
    serverHost: string;
    isProductionEnv?: boolean;
    clusterModeEnabled: boolean;
    httpsEnabled: boolean;
    allowedCors: string[];
    cacheRequests: boolean;
    targets: ProxyTarget[];
    apiToken?: string;
    maxWorkerThreads?: number | typeof Infinity;
  };
}
