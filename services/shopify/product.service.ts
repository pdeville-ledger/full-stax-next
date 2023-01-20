import {
  ShopifyService,
  GetProductListQuery,
  GetProductListQueryVariables,
  CurrencyCode,
  PaginatedProductListFragment,
} from "./shopify.service";

export namespace ProductService {
  export interface Single {
    title: string;
    description: string;
    seo: {
      title: string;
      description: string;
    };
    images: {
      id: string;
      src: string;
      alt: string;
    }[];
    variants: {
      id: string;
      title: string;
      image?: string;
      price: {
        amount: number;
        currencyCode: CurrencyCode;
      };
    }[];
  }

  export async function getSingle(handle: string): Promise<Single> {
    const { productByHandle } = await ShopifyService.getProductSingle({
      handle,
    });
    const { title, description, seo, images, variants } = productByHandle!;

    const product: Single = {
      title: title,
      description,
      seo: {
        title: seo.title || title,
        description: seo.description || description,
      },
      images: images.edges.map(({ node }) => {
        return {
          id: node.id as string,
          src: node.transformedSrc,
          alt: node.altText || "",
        };
      }),
      variants: variants.edges.map(({ node }) => {
        const variant: Single["variants"][0] = {
          id: node.id,
          title: node.title,
          image: node.image?.id!,
          price: {
            amount: Number(node.priceV2.amount),
            currencyCode: node.priceV2.currencyCode,
          },
        };

        return variant;
      }),
    };

    return product;
  }

  export interface ListItem {
    id: string;
    url: string;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    price: {
      amount: number;
      currencyCode: CurrencyCode;
    };
  }

  export interface List {
    products: ListItem[];
    pageInfo: GetProductListQuery["products"]["pageInfo"];
  }

  export function getListFromPaginatedProductPage(
    fragment: PaginatedProductListFragment
  ): List {
    const { edges, pageInfo } = fragment;
    const products: List["products"] = edges.map(({ node, cursor }) => {
      return {
        id: node.id,
        // cursor: cursor,
        url: `/products/${node.handle}`,
        title: node.title,
        description: node.description,
        image: {
          src: node.images.edges[0].node.transformedSrc,
          alt: node.images.edges[0].node.altText || "",
        },
        price: {
          amount: Number(node.priceRange.minVariantPrice.amount),
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
        },
      };
    });

    return { products, pageInfo };
  }

  export async function getList(
    variables?: GetProductListQueryVariables
  ): Promise<List> {
    const { products } = await ShopifyService.getProductList(variables);
    console.log("products after fetch =>", products);
    return getListFromPaginatedProductPage(products);
  }
}
