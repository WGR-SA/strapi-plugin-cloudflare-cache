export interface CloudflareCachePluginConfig {
  enabled: boolean;
  cloudflareToken: string;
  cloudflareZoneId: string;
  models: string[];
}

export interface CloudflareResponse {
  success: boolean;
  errors: Array<{
    code: number;
    message: string;
  }>;
  messages: string[];
  result: any;
}

export interface LifecycleEvent {
  action: string;
  model: {
    uid: string;
    modelName: string;
  };
  result: {
    id: number | string;
    publishedAt?: Date;
    [key: string]: any;
  };
}