/**
 * cache service
 */
import { CloudflareResponse } from '../types';
import { Strapi } from '@strapi/strapi';
import fetch from 'node-fetch';

export default ({ strapi }: { strapi: Strapi }) => ({
  async purgeCache(): Promise<boolean> {
    const config = strapi.config.get('plugin.strapi-plugin-cloudflare-cache');

    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${config.cloudflareZoneId}/purge_cache`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.cloudflareToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            purge_everything: true,
          })
        }
      );

      const data: CloudflareResponse = await response.json();

      if (!data.success) {
        data.errors.forEach((error) => {
          strapi.log.error(`Failed to purge Cloudflare cache: ${error.code} ${error.message}`);
        })
        return false;
      }

      strapi.log.info('Successfully purged Cloudflare cache');
      return true;
    } catch (error) {
      strapi.log.error('Error purging Cloudflare cache:', error);
      return false;
    }
  },
});