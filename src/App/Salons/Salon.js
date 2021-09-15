import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSalonInfo } from "../Providers/salonProvider";
import { useCart } from "../Providers/servicesCategoryProvider";

function Salon() {
  const location = useLocation();
  const { setSalonId, salonInfo, isLoading } = useSalonInfo();
  const {
    serviceCart,
    setServiceCart,
    setCartSalonId,
    totalPrice,
    setTotalPrice,
  } = useCart();
  const [idLocation, setIdLocation] = useState();
  const [categoryList, setCategoryList] = useState();

  function containsObject(id, list) {
    let i;

    for (i = 0; i < list.length; i++) {
      if (list[i].service && list[i].service.service_id === id) {
        return true;
      }
    }

    return false;
  }
  function removeObject(id, list) {
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].service && list[i].service.service_id === id) {
        list.splice(i, 1);
      }
    }
    setServiceCart(list);
    setCategories(salonInfo, list);
  }

  function setVars() {
    if (location && location.state) {
      const { id } = location.state;
      setIdLocation(id);
      setSalonId(id);
    }
  }
  useEffect(() => {
    setVars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setCategories(salonInfo, serviceCart) {
    if (salonInfo && salonInfo.salon_categories) {
      setCategoryList(
        salonInfo.salon_categories.map((category) => (
          <div key={category.category_id}>
            <h3>{category.category_name}</h3>
            {category.services.map((service, index) => (
              <div key={service.service_id}>
                <p>{service.service_name}</p>
                {containsObject(service.service_id, serviceCart) ? (
                  <button
                    onClick={() => {
                      removeObject(service.service_id, serviceCart);
                      setTotalPrice(
                        totalPrice - parseInt(service.service_price)
                      );
                    }}
                  >
                    -
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setServiceCart([
                          ...serviceCart,
                          (serviceCart[serviceCart.length] = { service }),
                        ]);
                        setTotalPrice(
                          totalPrice + parseInt(service.service_price)
                        );
                      }}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ))
      );
      if (serviceCart.length !== 0) {
        setCartSalonId(salonInfo.salon_id);
      } else setCartSalonId(null);
    }
  }
  useEffect(() => {
    setCategories(salonInfo, serviceCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonInfo, serviceCart.length]);
  useEffect(() => {
    console.log("new cart is: ");
    console.log(serviceCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceCart.length]);

  return idLocation ? (
    <div>
      <h2>{idLocation}</h2>
      <h1>This is salon page</h1>
      {!isLoading ? (
        salonInfo && salonInfo.salon_id ? (
          <>
            <h1>{salonInfo.salon_name}</h1>
            {categoryList}
            {serviceCart.length !== 0 ? (
              <Link to="/dashboard/salon/slots">show cart</Link>
            ) : (
              ""
            )}
          </>
        ) : (
          <h2>Salon not available</h2>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  ) : (
    <>
      <h1>Please Choose Salon From home Page</h1>
      <Link to="/dashboard"> Home Page</Link>
    </>
  );
}

export default Salon;
