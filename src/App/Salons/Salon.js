import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSalonInfo } from "../Providers/salonProvider";
import { useCart } from "../Providers/servicesCategoryProvider";

function Salon() {
  const location = useLocation();
  const { setSalonId, salonInfo, isLoading } = useSalonInfo();
  // const  doesContain  = useCart();
  // const  removeService  = useCart();
  // const  addService  = useCart();
  const [idLocation, setIdLocation] = useState();
  const [categoryList, setCategoryList] = useState();

  function setVars() {
    if (location && location.state) {
      const { id } = location.state;
      setIdLocation(id);
      setSalonId(id);
    }
  }
  useEffect(() => {
    setVars();
  }, []);

  async function setCategories(salonInfo) {
    if (salonInfo&&salonInfo.salon_categories) {
      setCategoryList(
        salonInfo.salon_categories.map((category) => (
          <div key={category.category_id}>
            <h3>{category.category_name}</h3>
            {category.services.map((service,index) => (
              <div key={service}><p>{service.service_name}</p>
              {/* doesContain(service)=== */false?
              <button /*onClick={()=>removeService(index)}*/>-</button>
              :<button /*onClick={()=>addService(service)}*/>+</button>}
              </div>
            ))}
          </div>
        ))
      );
    }
  }
  useEffect(() => {
    setCategories(salonInfo);
  }, [salonInfo]);

  return idLocation ? (
    <div>
      <h2>{idLocation}</h2>
      <h1>This is salon page</h1>
      {!isLoading ? (
        salonInfo && salonInfo.salon_id ? (
          <>
            <h1>{salonInfo.salon_name}</h1>
            {categoryList}
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
