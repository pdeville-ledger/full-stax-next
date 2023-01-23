import { GraphQLClient } from "graphql-request";
import { getSdk } from "./config/generated";

const space = process.env.NEXT_PUBLIC_CONFLUENCE_SPACE_ID!;
const accessToken = process.env.NEXT_PUBLIC_CONFLUENCE_ACCESS_TOKEN!;

export const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${space}`,
  {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
);

export const ContentfulService = getSdk(client);

export * from "./config/generated";
