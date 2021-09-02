import React, { useState, useEffect, useContext } from "react";

const ServicesCategoryContext = React.createContext();

export function useCart() {
  useContext(ServicesCategoryContext);
}

export function ServicesCategoryProvider({ children }) {
  const [serviceCart, setServiceCart] = useState([{}]);
  
  function doesContain(serviceObject) {
    let found = serviceCart.includes(serviceObject);
    console.log("found ? " , found)
    return found;
    //return true  or false
  }
  function addService(serviceObject) {
    setServiceCart((prevItems) => [
      ...prevItems,
        {serviceObject}
    ]);
  }
  function removeService(index) {
      setServiceCart(serviceCart.splice(index, 1))
  }
  useEffect(() => {
    console.log("serviceCart is : ");
    console.log(serviceCart);
  }, [serviceCart])

  return (
    <ServicesCategoryContext.Provider
      value={ doesContain, addService, removeService }
    >
      {children}
    </ServicesCategoryContext.Provider>
  );
}
