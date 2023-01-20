import { ProductService } from "./product.service";
import {
  ShopifyService,
  GetCollectionListQueryVariables,
  GetCollectionListQuery,
} from "./shopify.service";

export namespace CollectionService {
  export interface SingleCollection {
    title: string;
    description: string;
    seo: {
      title: string;
      description: string;
    };
    products: ProductService.List;
  }

  export async function getSingle(
    handle: string,
    productsAfter?: string
  ): Promise<SingleCollection> {
    const { collectionByHandle } = await ShopifyService.getCollectionSingle({
      handle,
      productsAfter,
    });

    const { title, description, products } = collectionByHandle!;

    let singleCollection: SingleCollection = {
      title: title,
      description,
      seo: {
        title: title,
        description,
      },
      products: ProductService.getListFromPaginatedProductPage(products),
    };

    return singleCollection;
  }

  export interface Collection {
    id: string;
    handle: string;
    title: string;
    url: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
  }

  export interface CollectionList {
    collections: Collection[];
    pageInfo: GetCollectionListQuery["collections"]["pageInfo"];
  }

  export async function getList(
    variables?: GetCollectionListQueryVariables
  ): Promise<CollectionList> {
    const {
      collections: { edges, pageInfo },
    } = await ShopifyService.getCollectionList(variables);

    const collections: CollectionList["collections"] = edges
      .filter(({ node }) => {
        return node.products.edges.length;
      })
      .map(({ node, cursor }) => {
        return {
          id: node.id,
          cursor: cursor,
          handle: node.handle,
          url: `/collections/${node.handle}`,
          title: node.title,
          description: node.description,
          image: {
            src: node.image?.transformedSrc ?? "",
            alt: node.image?.altText ?? "",
          },
        };
      });

    return { collections, pageInfo };
  }
}
