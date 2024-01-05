/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";

const Login = ({ clickHandler }) => {
  //****Navigate****/
  let navigate = useNavigate();

  //****References****
  const pswRef = useRef();
  const iconRef1 = useRef();
  const iconRef2 = useRef();
  const lineRef1 = useRef();
  const lineRef2 = useRef();

  //****States****
  const intialState = { email: "", password: "" };
  const [state, setState] = useState(intialState);

  //****Logic****
  function changeHundler(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  //Hide and show password function
  const eyeClick = (e) => {
    if (pswRef.current.type === "password") {
      e.target.classList.replace("uil-eye", "uil-eye-slash");
      pswRef.current.type = "text";
    } else {
      e.target.classList.replace("uil-eye-slash", "uil-eye");
      pswRef.current.type = "password";
    }
  };

  //Focus function
  const focusHandler = (e) => {
    if (e.target.type === "email") {
      lineRef1.current.style.width = "100%";
      iconRef1.current.style.color = "#4070f5";
    } else {
      lineRef2.current.style.width = "100%";
      iconRef2.current.style.color = "#4070f5";
    }
  };

  //Blur function
  const blurHandler = (e) => {
    if (e.target.type === "email") {
      lineRef1.current.style.width = "0";
      iconRef1.current.style.color = "#999";
    } else {
      lineRef2.current.style.width = "0";
      iconRef2.current.style.color = "#999";
    }
  };

  const connectionClick = async (e) => {
    e.preventDefault();
    try {
      if (state.password === "" || state.email === "") {
        setState({ ...state, password: "" });
        toast.info("Vous devez remplir les champs");
      } else {
        const regex = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
        if (!regex.test(state.email)) {
          toast.warning("Email invalide");
        } else {
          const response = await axios.post(
            "http://localhost:8090/login2",
            state
          );
          if (typeof response.data === "string") {
            toast.error(response.data);
            setState({ ...state, password: "" });
          } else {
            let token = jwtDecode(response.data.token);
            console.log("token",token);
            if(token.isAdmin==="true"){
              token.isAdmin=true;
            }else{
              token.isAdmin=false;
            }
            const { password, createdAt, updatedAt, ...other } = token;
            localStorage.setItem("userInfo", JSON.stringify(other));
            if (other.isAdmin) navigate("/admin-users");
            else {
              navigate("/profil");
              toast.success(`Bienvenue ${response.data.username}`);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  //****Render****
  return (
    <Container>
      <Link to="/">
        <i
          title="Revenir à la page d'accueil"
          className="uil uil-left-arrow-from-left"
        ></i>
      </Link>
      <Title>se connecter</Title>
      <Form>
        <InputField>
          <input
            onFocus={focusHandler}
            onBlur={blurHandler}
            type="email"
            placeholder="Email"
            required
            autoComplete="false"
            name="email"
            value={state.email}
            onChange={changeHundler}
          />
          <i ref={iconRef1} className="uil uil-envelope"></i>
          <span ref={lineRef1} className="line-hover"></span>
        </InputField>
        <InputField>
          <input
            onFocus={focusHandler}
            onBlur={blurHandler}
            ref={pswRef}
            type="password"
            placeholder="Mot de passe"
            required
            value={state.password}
            name="password"
            onChange={changeHundler}
          />
          <i ref={iconRef2} className="uil uil-lock"></i>
          <i onClick={eyeClick} className="eye uil uil-eye"></i>
          <span ref={lineRef2} className="line-hover"></span>
        </InputField>
        <div className="forgot">
          <a href="#">
            MOT DE PASSE OUBLIÉ ?
          </a>
        </div>
        <Button type="submit" onClick={connectionClick}>
          Se connecter
        </Button>
        <div className="signup">
          Vous n'êtes pas inscrit?{" "}
          <a onClick={() => clickHandler(-50)}>Créer un compte</a>
        </div>
      </Form>
    </Container>
  );
};

//****Styled Components****
export const Container = styled.div`
  transition: margin-left 0.18s ease;
  background-color: #fff;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  height: fit-content;
  position: relative;
  .uil-left-arrow-from-left {
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
    font-size: 20px;
    color: #0070ff;
  }
`;

export const Title = styled.h1`
  text-transform: capitalize;
  font-size: 27px;
  position: relative;
  &::before {
    content: "";
    bottom: 0;
    height: 3px;
    width: 30px;
    position: absolute;
    background-color: #4070f4;
  }
`;

export const InputField = styled.div`
  position: relative;
  margin: 30px 0;
  input {
    width: 100%;
    padding: 15px 0 15px 35px;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
  }
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-53%);
    font-size: 23px;
    color: #999;
  }
  i.uil {
    left: 0;
  }
  i.eye {
    left: 93%;
    cursor: pointer;
  }
  .line-hover {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background-color: #4070f5;
    transition: 0.2s;
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: #0681ef;
  padding: 12px;
  border-radius: 10px;
  margin: 30px 0;
  border: none;
  outline: none;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  display: block;
  width: 100%;
  height: 100%;
  &:hover {
    background-color: #0676ed;
  }
`;

const Form = styled.form`
  position: relative;
  .forgot {
    margin-left: auto;
    width: fit-content;
    a {
      margin-right: 20px;
      font-size: 15px;
      color: #4070f5;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .signup {
    text-align: center;
    a {
      display: block;
      color: #4070f5;
      text-decoration: none;
      cursor: pointer;
      margin-left: 5px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Login;
