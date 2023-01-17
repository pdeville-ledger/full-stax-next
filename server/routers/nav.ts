import { GraphqlParams } from "@shopify/shopify-api/lib/clients/types";
import { Products } from "pages/products";
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

const nav = {
  header: {
    navlinks: [
      {
        name: "Products",
        links: [
          {
            name: "Ledger Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "Ledger Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "Ledger Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "Compare our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "App and services",
        links: [
          {
            name: "App and services Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "App and services Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "App and services Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "App and services our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "Learn",
        links: [
          {
            name: "Learn Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "Learn Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "Learn Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "Learn our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "For Business",
        links: [
          {
            name: "Business Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "Business Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "Business Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "Business our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "For devlopers",
        href: "developpers.ledger.com",
      },
      {
        name: "Support",
        href: "support.ledger.com",
      },
    ],
  },
};

export const navRouter = router({
  navigation: procedure.query(async ({ ctx }) => {
    // const nav = (await storefront.query<{ data: {navigation: any }}>({ data: mutation })).body
    // const body =
    // console.log(body)
    // const products = body?.data?.products?.edges || []

    return {
      nav: nav,
    };
  }),
});
