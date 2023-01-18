import Layout from "components/layout/layout";
import { ReactElement } from "react";

const Products = () => {
  return <div>Product Page</div>;
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <Layout black>{page}</Layout>;
};

export default Products;
