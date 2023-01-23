import { Product } from "shopify-storefront-api-typings";
import Image from "next/image";
import { trpc } from "utils/trpc";
import { ProductService } from "services/shopify/product.service";

export interface ProductV2 extends Product {
  featuredImage: {
    url: string;
  };
}

interface Props {
  product: ProductService.ListItem;
}

const Card = ({ product }: Props) => {
  const mutation = trpc.cartRouter.createCart.useMutation();

  const addProductToCart = () => {
    console.log("ici");
    mutation.mutate({ products: [{ id: "23" }] });
  };
  return (
    <div className="w-full max-w-sm rounded-lg bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <div className="relative rounded-t-lg p-8">
          <Image
            src={product.image.src}
            alt="Picture of the author"
            height={300}
            width={400}
          />
        </div>
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $599
          </span>
          <a
            href="#"
            onClick={addProductToCart}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
