import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import StatAdmin from "../components/StatAdmin";
import { Section, Body } from "./AdminUsers";
import Table from "../components/ServicesTableAdmin";

const AdminUsers = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const homeRef = useRef();

  const [services, setServices] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [nbServices, setNbServices] = useState(null);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        if (id) getUserServices(id);
        else getAllServices();
      } else {
        navigate("/profil");
      }
    }
  }, [id, navigate]);

  const getAllServices = async () => {
    try {
      await axios.get("http://localhost:8090/allServices").then((result) => {
        setServices(result.data);
        setNbServices(result.data.length);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserServices = async (id) => {
    try {
      await axios.get("http://localhost:8090/allServices").then((result) => {
        setServices(result.data.filter((e) => e.ownerUser === id));
        setNbServices(result.data.length);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchFunction = async (service) => {
    try {
      await axios
        .get("http://localhost:8090/allServices")
        .then((result) =>
          setServices(
            result.data.filter((e) =>
              e.title.toLowerCase().includes(service.toLowerCase())
            )
          )
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Body>
      <NavbarAdmin userInfo={userInfo} searchFunction={searchFunction} />

      <SidebarAdmin />

      <Section ref={homeRef} className="home">
        <StatAdmin statNb={nbServices} />

        <Table services={services} viewAllClick={getAllServices} />
      </Section>
    </Body>
  );
};

export default AdminUsers;
