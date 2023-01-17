import { GraphqlParams } from "@shopify/shopify-api/lib/clients/types";
import { storefront } from "server/shopify";
import { procedure } from "server/trpc";
import { CardBrand } from "shopify-storefront-api-typings";
import { z } from "zod";
import { router } from "../trpc";

const mutation = `
mutation cartCreate {
    cartCreate(input:  {
    lines:[ 
      {
        quantity: 1,
        merchandiseId: "gid://shopify/ProductVariant/12835223994421"
      }
    ]
  }) {
      cart {
        id
        lines(first: 10) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
  `;

export const cartRouter = router({
  createCart: procedure
    .input(
      z.object({
        products: z
          .array(
            z.object({
              quantity: z.number().optional(),
              id: z.string(),
            })
          )
          .nonempty(),
        cartId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const cart = (
        await storefront.query<{ data: { cartCreate: any } }>({
          data: mutation,
        })
      ).body;
      // const body =
      // console.log(body)
      // const products = body?.data?.products?.edges || []

      return {
        cart: cart,
        // products: products.map(productEdge => productEdge.node)
      };
    }),
});
