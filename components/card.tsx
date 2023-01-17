import { Product } from "shopify-storefront-api-typings"
import Image from 'next/image'
import { trpc } from "utils/trpc"

export interface ProductV2 extends Product {
    featuredImage: {
        url: string
    }
}

interface Props {
    product: ProductV2
}

const Card = ({ product }: Props) => {
    const mutation = trpc.cartRouter.createCart.useMutation();

    const addProductToCart = () => {
        console.log('ici')
        mutation.mutate({ products: [{ id: '23' }] })
    }
    return <div className="w-full  max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <div className="p-8 relative rounded-t-lg" >
                <Image
                    src={product?.featuredImage.url}
                    alt="Picture of the author"
                    fill
                />
            </div>

        </a>
        <div className="px-5 pb-5">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
            </a>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                <a
                    href="#"
                    onClick={addProductToCart}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
            </div>
        </div>
    </div>
}

export default Card