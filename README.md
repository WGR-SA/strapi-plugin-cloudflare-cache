
# Strapi Cloudflare Cache Purge Plugin

This plugin enables automatic purging of Cloudflare cache when content in specified Strapi models is added, edited, or deleted. It uses Cloudflare's API to clear cache for your specified zone, ensuring that your visitors always see the latest content.

## Installation

1. **Install the plugin**: `npm i @wgr-sa/strapi-plugin-cloudflare-cache`

2. **Configure Environment Variables**: Add the following variables to your environment configuration:
   ```env
   CLOUDFLARE_API_TOKEN=<your_cloudflare_api_token>
   CLOUDFLARE_ZONE_ID=<your_cloudflare_zone_id>
   ```

   - `CLOUDFLARE_API_TOKEN`: Cloudflare API token with permission to manage cache.
   - `CLOUDFLARE_ZONE_ID`: Cloudflare Zone ID for the site.

## Configuration

The plugin configuration file allows customization of the models (UIDs) that trigger cache purges.

1. **Plugin Config File**: Open the plugin configuration file (typically found at `./config/plugins.js`) and add the plugin configuration. This example configures the plugin with Cloudflare credentials and lists specific models (UIDs) for triggering cache purges:

   ```javascript
   module.exports = ({ env }) => ({
     'strapi-plugin-cloudflare-cache': {
       enabled: true,
       config: {
         uids: ['api::article.article', 'api::category.category'], // Add the UIDs for models you want to purge cache on change
       },
     },
   });
   ```

2. **Config Options**:

   - `uids`: Array of Strapi model UIDs that will trigger cache purges on create, update, and delete actions.

3. **Validation**: The plugin checks that `cloudflareToken` and `cloudflareZoneId` are provided. If these are missing, the plugin will throw an error on startup.

## Usage

1. When enabled and configured, the plugin will automatically purge Cloudflare cache for the specified zone whenever content in the listed models is created, updated, or deleted in Strapi.

2. **Example Usage**:
   - If you specify `uids: ['api::article.article']`, any changes to articles in Strapi will trigger a Cloudflare cache purge, ensuring that new or modified articles are immediately reflected on your site.

## Troubleshooting

- **Missing API Token or Zone ID**: If `cloudflareToken` or `cloudflareZoneId` are not set, the plugin will not start. Ensure both are defined in your environment configuration.
- **Cache Not Purging**: Check that the API token has permissions to manage cache for the specified zone and that the zone ID is correct.

## License

This plugin is licensed under the MIT License.
