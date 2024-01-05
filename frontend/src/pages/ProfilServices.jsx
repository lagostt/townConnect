import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Services, Body } from "./Profil";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Service from "../components/Service";

const ProfilServices = () => {
  // **** Navigation ****/
  const navigate = useNavigate();

  // **** States ****
  const [services, setServices] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin)
        navigate("/admin-users");
      else {
        const data = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(data);
        getProfilServices(JSON.parse(localStorage.getItem("userInfo")).id);
      }
    }
  }, [navigate]);

  // **** Profil test & set states ****
  const getProfilServices = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:8090/user/services/" + id);
      setServices(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteClick = (id) => {
    if (window.confirm("Etes vous sûr de vouloir supprimer ce service ?")) {
      try {
        axios.delete(`http://localhost:8090/service/${id}`);
        setServices(services.filter((e) => e.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Body>
      <Container>
        <Navbar userInfo={userInfo} />
        <Link style={{ textDecoration: "none" }} to={"/add-edit-service"}>
          <AddButton>Ajouter un service</AddButton>
        </Link>
        <Services className="container">
          {services.length === 0 ? (
            <div className="no-result">
              <p style={{ color: "#000", fontSize: "20px" }}>
                Vous n'avez pas de service
              </p>
            </div>
          ) : (
            services.map((e) => (
              <div key={e.id}>
                <Service key={e.id} service={e} />
                <div className="edit-del">
                  <button>
                    <Link
                      style={{ textDecoration: "none", color: "#2AAA8A" }}
                      to={`/add-edit-service/${e.id}`}
                    >
                      Modifier
                    </Link>
                  </button>
                  <button onClick={() => deleteClick(e.id)}>Supprimer</button>
                </div>
              </div>
            ))
          )}
        </Services>
      </Container>
      <Footer />
    </Body>
  );
};

const AddButton = styled.button`
  display: block;
  width: 200px;
  height: 40px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  outline: none;
  margin: 120px auto 60px;
  cursor: pointer;
`;

export default ProfilServices;
