import React, { useState, useEffect, useContext } from "react";
import { useSalonInfo } from "./salonProvider";

const ServicesCategoryContext = React.createContext();

export function useCart() {
  return useContext(ServicesCategoryContext);
}

export function ServicesCategoryProvider({ children }) {
  const {salonId} = useSalonInfo()
  const [serviceCart, setServiceCart] = useState([]);
  const [cartSalonId, setCartSalonId] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  function checkSalonCart(salonId,cartSalonId){
    if(salonId!==cartSalonId){
      setServiceCart([])
    }
  }

  useEffect(() => {
    checkSalonCart(salonId,cartSalonId)
  }, [salonId,cartSalonId])

  useEffect(() => {
    console.log("serviceCart is : ");
    console.log(serviceCart);
  }, [serviceCart]);

  useEffect(() => {
    console.log(totalPrice)
  }, [totalPrice])

  return (
    <ServicesCategoryContext.Provider
      value={{
        serviceCart,
        setServiceCart,
        setCartSalonId,
        cartSalonId,
        setTotalPrice,
        totalPrice,
      }}
    >
      {children}
    </ServicesCategoryContext.Provider>
  );
}
