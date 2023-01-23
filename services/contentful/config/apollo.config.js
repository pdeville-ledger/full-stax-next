const path = require("path");
const envKit = require("env-kit");

const space = envKit.get("CONFLUENCE_SPACE_ID");
const accessToken = envKit.get("CONFLUENCE_ACCESS_TOKEN");

const generated = path.join(__dirname, "./generated.ts");
const documents = path.join(__dirname, "../graphql/**/*.gql");

console.log("PATH", generated, documents);
module.exports = {
  client: {
    service: {
      name: "Confluence Api",
      url: `https://graphql.contentful.com/content/v1/spaces/${space}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    excludes: [generated],
    includes: [documents],
  },
};
