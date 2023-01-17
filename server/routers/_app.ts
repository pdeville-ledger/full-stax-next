import gql from "graphql-tag";
import { storefront } from "server/shopify";
import { ClientType } from "@shopify/shopify-api/lib/types"
import { z } from "zod";
import { procedure, router } from "../trpc";
import { ProductConnection } from "shopify-storefront-api-typings";
import { cartRouter } from "./cart";
import { navRouter } from "./nav";

const queryString = `
query products {
    products(first: 3) {
      edges {
        node {
          id
          title
          featuredImage {
            url 
        }
        variants(first: 10) {
          nodes {
            id
          }
        }
        }
      }
    }
}
`

export const appRouter = router({

    hello: procedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .query(async ({ input }) => {
            const body = (await storefront.query<{ data: {products: ProductConnection }}>({ data: queryString })).body
            console.log(body)
            const products = body?.data?.products?.edges || []

            return {
                greeting: `hello ${input.text}`,
                products: products.map(productEdge => productEdge.node)
            };
        }),
        cartRouter,
        navRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;