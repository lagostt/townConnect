import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const StatAdmin = ({ statNb }) => {
  const [nbUsers, setNbUsers] = useState(0);
  const [nbServices, setNbServices] = useState(0);
  const [nbNotValid, setNbNotValid] = useState();

  useEffect(() => {
    getNbUsers();
    getNbServices();
    getNbNotValid();
  }, [statNb]);

  const getNbUsers = async () => {
    try {
      await axios.get("http://localhost:8090/users").then((result) => {
        setNbUsers(result.data.length);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getNbServices = async () => {
    try {
      await axios
        .get("http://localhost:8090/allServices")
        .then((result) => setNbServices(result.data.length));
    } catch (err) {
      console.log(err);
    }
  };

  const getNbNotValid = async () => {
    try {
      await axios
        .get("http://localhost:8090/allServices")
        .then((result) =>
          setNbNotValid(result.data.filter((e) => !e.confirm).length)
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stat>
      <div className="stat">
        <div>
          <h2>{nbUsers}</h2>
          <p>Utilisateurs</p>
        </div>
        <i className="fa-solid fa-users icon"></i>
      </div>

      <div className="stat">
        <div>
          <h2>{nbServices}</h2>
          <p>Services</p>
        </div>
        <i className="fa-solid fa-bell-concierge icon"></i>
      </div>

      <div className="stat">
        <div>
          <h2>{nbNotValid}</h2>
          <p>Non validé</p>
        </div>
        <i className="fa-solid fa-clock icon"></i>
      </div>
    </Stat>
  );
};

const Stat = styled.div`
  margin: 60px 0 0 100px;
  display: flex;
  gap: 70px;
  .stat {
    display: flex;
    align-items: center;
    gap: 15px;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        color: #0077ff;
        font-size: 35px;
        font-weight: 500;
      }
      p {
        color: #777;
        margin-top: -10px;
      }
    }
    i {
      font-size: 30px;
      color: #777;
    }
  }
`;

export default StatAdmin;
