"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.default = ({ strapi }) => ({
    async purgeCache() {
        const config = strapi.config.get('plugin.strapi-plugin-cloudflare-cache');
        try {
            const response = await (0, node_fetch_1.default)(`https://api.cloudflare.com/client/v4/zones/${config.cloudflareZoneId}/purge_cache`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.cloudflareToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    purge_everything: true,
                })
            });
            const data = await response.json();
            if (!data.success) {
                data.errors.forEach((error) => {
                    strapi.log.error(`Failed to purge Cloudflare cache: ${error.code} ${error.message}`);
                });
                return false;
            }
            strapi.log.info('Successfully purged Cloudflare cache');
            return true;
        }
        catch (error) {
            strapi.log.error('Error purging Cloudflare cache:', error);
            return false;
        }
    },
});
