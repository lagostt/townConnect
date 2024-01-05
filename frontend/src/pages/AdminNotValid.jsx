import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import StatAdmin from "../components/StatAdmin";
import Table from "../components/ServicesTableAdmin";
import { Section, Body } from "./AdminUsers";

const AdminUsers = () => {
  const navigate = useNavigate();

  const homeRef = useRef();

  const [servicesNotValid, setServicesNotValid] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [nbServicesNotValid, setNbServicesNotValid] = useState(null);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        getAllServicesNotValid();
      } else {
        navigate("/profil");
      }
    }
  }, [navigate]);

  const getAllServicesNotValid = async () => {
    try {
      await axios.get("http://localhost:8090/allServices").then((result) => {
        setNbServicesNotValid(
          result.data.filter((e) => !e.confirm).length
        );
        setServicesNotValid(result.data.filter((e) => !e.confirm));
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
          setServicesNotValid(
            result.data.filter(
              (e) =>
                e.title.toLowerCase().includes(service.toLowerCase()) &&
                !e.confirm
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
        <StatAdmin statNb={nbServicesNotValid} />
        <Table
          services={servicesNotValid}
          viewAllClick={getAllServicesNotValid}
        />
      </Section>
    </Body>
  );
};

export default AdminUsers;
