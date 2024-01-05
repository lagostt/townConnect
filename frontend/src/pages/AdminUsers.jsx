import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import StatAdmin from "../components/StatAdmin";
import Table from "../components/UsersTableAdmin";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [nbUsers, setNbUsers] = useState(null);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        getAllUsers();
      } else {
        navigate("/profil");
      }
    }
  }, [navigate]);

  const getAllUsers = async () => {
    try {
      await axios.get("http://localhost:8090/users").then((result) => {
        setUsers(result.data);
        setNbUsers(result.data.length);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchFunction = async (user) => {
    try {
      await axios.get("http://localhost:8090/users").then((result) => {
        if (
          result.data.filter((e) =>
            e.username.toLowerCase().includes(user.toLowerCase())
          ).length !== 0
        )
          setUsers(
            result.data.filter((e) =>
              e.username.toLowerCase().includes(user.toLowerCase())
            )
          );
        else {
          setUsers(result.data.filter((e) => e.id === user));
        }
        setNbUsers(result.data.length);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Body>
      <NavbarAdmin userInfo={userInfo} searchFunction={searchFunction} />
      <SidebarAdmin />
      <Section>
        <StatAdmin statNb={nbUsers} />
        <Table users={users} viewAllClick={getAllUsers} />
      </Section>
    </Body>
  );
};

export const Body = styled.div`
  background-color: #e4e9f7;
  transition: all 0.3s ease;
  min-height: 100vh;
`;

export const Section = styled.div`
  padding-bottom: 50px;
  height: fit-content;
  overflow: auto;
  transform: translateX(250px);
  width: calc(100vw - 250px);
`;

export default AdminUsers;
