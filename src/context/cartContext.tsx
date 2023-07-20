import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  import axiosInstance from "../axiosInstance.js";
  import { useAuth } from "./authContext.tsx";
  
  type CartContextType = {};
  
  export const CartContext = createContext<CartContextType>();
  
  export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();
  
    console.log("user from cart provider", user?.user?.id);
  
    const loadCart = useCallback(async () => {
      try {
        const url = "660/cart";
        const res = await axiosInstance.get(url);
        setCart(res);
      } catch (error) {
        console.log(error.message);
      }
    }, []);
  
    const addToCart = useCallback(
      async (data) => {
        try {
          const userId = user?.user?.id;
          const url = "660/cart";
          const res = await axiosInstance.post(url, { ...data, userId });
          setCart((val) => [...val, res]);
          //   setCart(res);
        } catch (error) {
          //   console.log(error.message);
        }
      },
      [user?.user?.id]
    );
  
    const updateCart = useCallback(async (data) => {
      try {
        const url = `660/cart/${data.id}`;
        const res = await axiosInstance.put(url, data);
        setCart((val) => {
          const index = val.findIndex((x) => x.id === res.id);
          return [...val.slice(0, index), res, ...val.slice(index + 1)];
        });
        //   setCart(res);
      } catch (error) {
        //   console.log(error.message);
      }
    }, []);
  
    const deleteCart = useCallback(async (data) => {
      try {
        const url = `660/cart/${data.id}`;
        await axiosInstance.delete(url);
        setCart((val) => {
          const index = val.findIndex((x) => x.id === data.id);
          return [...val.slice(0, index), ...val.slice(index + 1)];
        });
      } catch (error) {
        //   console.log(error.message);
      }
    }, []);
  
    const value = useMemo(
      () => ({ cart, loadCart, addToCart, updateCart, deleteCart }),
      [cart, loadCart, addToCart, updateCart, deleteCart]
    );
  
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  };
  
  export const useCart = () => useContext(CartContext);
  