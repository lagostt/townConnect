/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Title, Container, Button, InputField } from "./Login";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";

const Register = ({ clickHandler }) => {
  //Refernces
  const iconRef1 = useRef();
  const iconRef2 = useRef();
  const iconRef3 = useRef();
  const iconRef4 = useRef();
  const lineRef1 = useRef();
  const lineRef2 = useRef();
  const lineRef3 = useRef();
  const lineRef4 = useRef();
  const acceptRef = useRef();
  const pswRef = useRef();

  //****States****
  const intialState = { email: "", username: "", password: "", confirmPsw: "" };
  const [state, setState] = useState(intialState);

  //****Navigate****/
  let navigate = useNavigate();

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
    if (e.target.name === "username") {
      lineRef1.current.style.width = "100%";
      iconRef1.current.style.color = "#4070f5";
    } else if (e.target.name === "email") {
      lineRef2.current.style.width = "100%";
      iconRef2.current.style.color = "#4070f5";
    } else if (e.target.name === "password") {
      lineRef3.current.style.width = "100%";
      iconRef3.current.style.color = "#4070f5";
    } else if (e.target.name === "confirmPsw") {
      lineRef4.current.style.width = "100%";
      iconRef4.current.style.color = "#4070f5";
    }
  };

  //Blur function
  const blurHandler = (e) => {
    if (e.target.name === "username") {
      lineRef1.current.style.width = "0";
      iconRef1.current.style.color = "#999";
    } else if (e.target.name === "email") {
      lineRef2.current.style.width = "0";
      iconRef2.current.style.color = "#999";
    } else if (e.target.name === "password") {
      lineRef3.current.style.width = "0";
      iconRef3.current.style.color = "#999";
    } else if (e.target.name === "confirmPsw") {
      lineRef4.current.style.width = "0";
      iconRef4.current.style.color = "#999";
    }
  };

  // Sign function
  const signClick = async (e) => {
    e.preventDefault();
    try {
      if (
        state.password === "" ||
        state.email === "" ||
        state.username === "" ||
        state.confirmPsw === ""
      )
        toast.info("Vous devez remplir les champs");
      else {
        const regex = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
        if (!regex.test(state.email)) toast.warning("Email invalide");
        else {
          var strongRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
          );
          if (!strongRegex.test(state.password)) {
            toast.info(
              "Le mot de passe doit être composé de 8 caractères avec au moins une lettre (majuscule et minuscule) et un chiffre"
            );
          } else if (state.confirmPsw !== state.password)
            toast.warning("Les mots de passe ne sont pas identiques");
          else {
            if (!acceptRef.current.checked)
              toast.warning("Il faut accepter les termes & conditions");
            else {
              const { confirmPsw, ...other } = state;
              const responce = await axios.post(
                "http://localhost:8090/register",
                other
              );
              const {username} = responce.data;
              if (username === null) {
                setState({ ...state, password: "", confirmPsw: "" });
                toast.warning("Cette adresse e-mail est déjà prise");
              } else {
                const responce = await axios.post(
                  "http://localhost:8090/login",
                  { email: state.email, password: state.password }
                );
                const { password, isAdmin, createAt, updateAt, ...other } =
                  responce.data;
                localStorage.setItem("userInfo", JSON.stringify(other));
                navigate("/profil");
                toast.success(
                  `Bienvenue ${JSON.parse(localStorage.getItem("userInfo")).username}`
                );
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const download = async () => {
    try {
      await axios
        .get("http://localhost:8090/download")
        .then((result) => FileDownload(result.data, "Conditions&terms.txt"));
    } catch (err) {
      console.log(err);
    }
  };

  //****Render****
  return (
    <>
      <Container>
        <Link to="/">
          <i
            title="Revenir à la page d'accueil"
            className="uil uil-left-arrow-from-left"
          ></i>
        </Link>
        <Title>créer un compte</Title>
        <Form>
          <InputField>
            <input
              onFocus={focusHandler}
              onBlur={blurHandler}
              type="text"
              placeholder="Nom et prénom"
              required
              autoComplete="false"
              value={state.username}
              name="username"
              onChange={changeHundler}
            />
            <i ref={iconRef1} className="uil uil-user"></i>
            <span ref={lineRef1} className="line-hover"></span>
          </InputField>
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
            <i ref={iconRef2} className="uil uil-envelope"></i>
            <span ref={lineRef2} className="line-hover"></span>
          </InputField>
          <InputField>
            <input
              onFocus={focusHandler}
              onBlur={blurHandler}
              ref={pswRef}
              type="password"
              placeholder="Mot de passe"
              required
              autoComplete="false"
              name="password"
              value={state.password}
              onChange={changeHundler}
            />
            <i ref={iconRef3} className="uil uil-lock"></i>
            <i onClick={eyeClick} className="eye uil uil-eye"></i>
            <span ref={lineRef3} className="line-hover"></span>
          </InputField>
          <InputField>
            <input
              onFocus={focusHandler}
              onBlur={blurHandler}
              type="password"
              placeholder="Confirmez le mot de passe"
              required
              autoComplete="false"
              name="confirmPsw"
              value={state.confirmPsw}
              onChange={changeHundler}
            />
            <i ref={iconRef4} className="uil uil-lock"></i>
            <span ref={lineRef4} className="line-hover"></span>
          </InputField>
          <div className="terms">
            <input ref={acceptRef} id="accept-check" type="checkbox" />
            <label htmlFor="accept-check">
              J'accepte tous les termes & conditions
            </label>
            <i className="fa-solid fa-download" onClick={download}></i>
          </div>
          <Button type="submit" onClick={signClick}>
            inscription
          </Button>
          <div className="login">
            Vous avez déjà un compte?{" "}
            <a onClick={() => clickHandler(0)}>Se connecter</a>
          </div>
        </Form>
      </Container>
    </>
  );
};

//****Styled Components****
const Form = styled.form`
  .terms {
    position: relative;
    font-size: 15px;
    input {
      margin-right: 10px;
      transform: translateY(1.5px);
      accent-color: #4070f5;
    }
    label {
      user-select: none;
    }
    i {
      color: #0077ff;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .login {
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

export default Register;
