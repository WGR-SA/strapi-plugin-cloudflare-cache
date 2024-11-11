import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.db.lifecycles.subscribe(async (event) => {
    const { action, model } = event;
    const plugin = strapi.plugin('strapi-plugin-cloudflare-cache');
    const uids = plugin.config('uids');

    if (uids.includes(model.uid) && ['afterCreate', 'afterUpdate', 'afterDelete'].includes(action)) {
      await plugin.service('cache').purgeCache()
    }
  });
};
