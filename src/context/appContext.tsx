import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  
  type AppType = {
    isCartVisible: boolean;
    isLoading: false;
  };
  
  type AppContextType = {
    app: AppType;
    showCart: () => void;
  };
  
  export const AppContext = createContext<AppContextType>({
    app: {
      isCartVisible: false,
      isLoading: false,
    },
    showCart: () => {
      return null;
    },
  });
  
  export const AppProvider = ({ children }: PropsWithChildren) => {
    const [app, setApp] = useState<AppType>({
      isCartVisible: false,
      isLoading: false,
    });
  
    const showCart = useCallback(() => {
      setApp((val) => ({ ...val, isCartVisible: !val.isCartVisible }));
    }, []);
  
    const value = useMemo(() => ({ app, showCart }), [app, showCart]);
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };
  
  export const useApp = () => useContext(AppContext);
  