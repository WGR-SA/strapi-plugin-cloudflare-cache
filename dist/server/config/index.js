"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    default: {
        enabled: true,
        cloudflareToken: process.env.CLOUDFLARE_API_TOKEN,
        cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID,
        uids: [],
    },
    validator(config) {
        if (!config.cloudflareToken) {
            throw new Error('Cloudflare API token is required');
        }
        if (!config.cloudflareZoneId) {
            throw new Error('Cloudflare Zone ID is required');
        }
    },
};
