import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Login from "../components/Login";
import SignUp from "../components/Register";

const LoginRegister = () => {
  //****Navigate****/
  let navigate = useNavigate();

  //***States ***/
  const [trans, setTrans] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.isAdmin) navigate("/admin-users");
      else navigate("/profil");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleForms = {
    transform: `translate(${trans}%)`,
  };

  function clickHandler(t) {
    setTrans(t);
  }

  return (
    <Body>
      <LoginSignContainer className="container">
        <Forms style={styleForms}>
          <Login clickHandler={clickHandler} />
          <SignUp clickHandler={clickHandler} />
        </Forms>
      </LoginSignContainer>
    </Body>
  );
};

export const Body = styled.div`
  background-color: #2a2a72;
  background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginSignContainer = styled.div`
  max-width: 500px;
  overflow: hidden;
`;

const Forms = styled.div`
  width: 200%;
  display: flex;
  transition: 0.1s;
`;

export default LoginRegister;
