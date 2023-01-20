const npsUtils = require("nps-utils");

module.exports = {
  scripts: {
    dev: npsUtils.concurrent.nps("next", "graphql"),
    build: npsUtils.series.nps("graphql.build", "next.build"),
    next: {
      default: "next dev",
      build: "next build",
    },
    graphql: {
      build: npsUtils.series.nps("graphql.download", "graphql.codegen"),
      default: npsUtils.series.nps(
        "graphql.download",
        "graphql.codegen --watch"
      ),
      download:
        "apollo client:download-schema -c services/shopify/config/apollo.config.js services/shopify/config/schema.gql",
      codegen: "graphql-codegen -c services/shopify/config/codegen.config.js",
    },
  },
};
