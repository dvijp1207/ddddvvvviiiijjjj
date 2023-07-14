import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance.js";

type ProductsContextType = {};

export const ProductsContext = createContext<ProductsContextType>();

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const url = "660/products";
     
      const res = await axiosInstance.get(url);
      setProducts(res);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const value = useMemo(
    () => ({ products, loadProducts }),
    [products, loadProducts]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
