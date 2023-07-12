import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";

type Props = {};

const Product = (props: Props) => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`660/products/${id}`);
      setProduct(res);
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  console.log(product);

  return <div>Product</div>;
};

export default Product;
