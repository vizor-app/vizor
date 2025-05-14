import { URL } from 'node:url';

export type ProviderConfig = {
  url?: string;
  urlFor?: (url: string) => string;
};

function assembleProviderUrl(hostname: string, path?: string): string {
  const protocol = hostname.startsWith('https') ? 'https' : '';
  const url = new URL(`${protocol}://${hostname}${path}`);
  return url.toString();
}

export const META_INSIGHTS_API: ProviderConfig = {
  url: 'https://graph.facebook.com/v21.0',
};

export const WOOCOMMERCE_ANALYTICS_API: ProviderConfig = {
  urlFor: (hostname) => assembleProviderUrl(hostname, '/api/v1/analytics'),
}

export const providerConfigs: Record<string, ProviderConfig> = {
  metaInsights: META_INSIGHTS_API,
  wooCommerceAnalytics: WOOCOMMERCE_ANALYTICS_API,
}
