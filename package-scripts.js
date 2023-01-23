const npsUtils = require("nps-utils");

module.exports = {
  scripts: {
    dev: npsUtils.concurrent.nps("next", "shopify", "contentful"),
    build: npsUtils.series.nps(
      "shopify.build",
      "contentful.build",
      "next.build"
    ),
    next: {
      default: "next dev",
      build: "next build",
    },
    shopify: {
      build: npsUtils.series.nps("shopify.download", "shopify.codegen"),
      default: npsUtils.series.nps(
        "shopify.download",
        "shopify.codegen --watch"
      ),
      download:
        "apollo client:download-schema -c services/shopify/config/apollo.config.js services/shopify/config/schema.gql",
      codegen: "graphql-codegen -c services/shopify/config/codegen.config.js",
    },
    contentful: {
      build: npsUtils.series.nps("contentful.download", "contentful.codegen"),
      default: npsUtils.series.nps(
        "contentful.download",
        "contentful.codegen --watch"
      ),
      download:
        "apollo client:download-schema -c services/contentful/config/apollo.config.js services/contentful/config/schema.gql",
      codegen:
        "graphql-codegen -c services/contentful/config/codegen.config.js",
    },
  },
};
