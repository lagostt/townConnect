import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FilterServices from "../components/FilterServices";
import store from "../redux/store";
import Navbar from "../components/Navbar";
import Service from "../components/Service";
import Footer from "../components/Footer";
import ServiceNotFound from "../components/ServiceNotFound";

const Home = () => {
  // **** useNavigate ****/
  const navigate = useNavigate();

  // ****States****
  const [services, setServices] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // ****Logic****

  // ****Profil test & set states****
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin)
        navigate("/admin-users");
      else {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        if (store.getState().length === 0) {
          store.dispatch({
            type: "GET_SERVICES",
            payload: { id: JSON.parse(localStorage.getItem("userInfo")).id },
          });
        }
        store.getState().then((result) => setServices(result));
      }
    }
  }, [navigate]);

  //****Set Services from componnent ****
  const setServicesFunction = () => {
    store.getState().then((result) => setServices(result));
  };

  return (
    <Body>
      <Container>
        <Navbar userInfo={userInfo} setServicesFunction={setServicesFunction} />
        <FilterServices
          id={userInfo?.id}
          setServicesFunction={setServicesFunction}
        />
        <Services className="container">
          {services.length === 0 ? (
            <ServiceNotFound />
          ) : (
            services.map((e) => <Service key={e.id} service={e} />)
          )}
        </Services>
      </Container>
      <Footer />
    </Body>
  );
};

//Styled componnents
export const Body = styled.div`
  position: relative;
  min-height: calc(100vh - 100px);
`;

export const Container = styled.div`
  padding-bottom: 120px;
`;

export const Services = styled.div`
  min-height: 250px;
  position: relative;
  user-select: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  column-gap: 40px;
  row-gap: 60px;

  .edit-del {
    position: relative;
    z-index: 1;
    transition: 0.5s;
    display: flex;
    border: 1px solid #333;
    border-top: none;
    border-radius: 0 0 10px 10px;
    width: 250px;
    margin: 0 auto;
    justify-content: center;
    gap: 20px;
    button {
      padding: 5px;
      border: none;
      outline: none;
      cursor: pointer;
      height: 100%;
      &:hover {
        text-decoration: underline;
      }
    }
    button:last-child {
      color: #cd5c5c;
    }
  }
  .no-result {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    text-align: center;
    img {
      display: inline;
      width: 100px;
    }
    p {
      width: fit-content;
      color: rgba(255, 0, 0, 0.8);
    }
  }
`;

export default Home;
