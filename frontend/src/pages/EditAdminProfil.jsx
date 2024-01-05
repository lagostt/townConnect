import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import NavbarAdmin from "../components/NavbarAdmin";
import { toast } from "react-toastify";
import { Section, Body } from "./AdminUsers";

const EditAdminProfil = () => {
  const navigate = useNavigate();

  const pswRef = useRef();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const editEmailIcon = useRef();
  const editNameIcon = useRef();

  const [userInfo, setUserInfo] = useState({
    profilePicture: "",
    email: "",
    username: "",
  });
  const [confirmPsw, setConfirmPsw] = useState("");
  const [actuelPsw, setActuelPsw] = useState("");
  const [newPsw, setNewPsw] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
        const data = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(data);
        setUserName(data.username);
        setEmail(data.email);
      } else {
        navigate("/profil");
      }
    }
  }, [navigate]);

  const infoSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === userInfo.email && username === userInfo.username)
        toast.info("Changer vos informatios");
      else {
        const responce = await axios.put(
          `http://localhost:8090/user/info/${userInfo.id}`,
          { username: username, email: email }
        );
        if (responce.data === "true") {
          setUserInfo((prev) => {
            return { ...prev, email: email, username: username };
          });
          const localData = {
            ...JSON.parse(localStorage.getItem("userInfo")),
            email: email,
            username: username,
          };
          localStorage.setItem("userInfo", JSON.stringify(localData));
          nameInputRef.current.setAttribute("disabled", true);
          emailInputRef.current.setAttribute("disabled", true);
          editEmailIcon.current.style.color = "#555";
          editNameIcon.current.style.color = "#555";
          toast.success("Vos données ont été correctement modifiées");
        } else toast.error("Quelque chose s'est mal passé");
      }
    } catch (err) {
      console.log(err);
      toast.error("Quelque chose s'est mal passé");
    }
  };

  const penClickName = (e) => {
    if (nameInputRef.current.hasAttribute("disabled")) {
      nameInputRef.current.removeAttribute("disabled");
      e.target.style.color = "#aaa";
    }
  };

  const penClickEmail = (e) => {
    if (emailInputRef.current.hasAttribute("disabled")) {
      emailInputRef.current.removeAttribute("disabled");
      e.target.style.color = "#aaa";
    }
  };

  // ****Requests functions *****
  const passwordSubmit = async (e) => {
    e.preventDefault();
    if (newPsw === "" || confirmPsw === "" || actuelPsw === "")
      toast.info("Vous devez remplir les champs");
    else {
      var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
      );
      if (!strongRegex.test(newPsw))
        toast.info(
          "Le mot de passe doit être composé de 8 caractères avec au moins une lettre (majuscule et minuscule) et un chiffre"
        );
      else if (confirmPsw !== newPsw)
        toast.warning("Les mots de passe ne sont pas identiques");
      else {
        try {
          const responce = await axios.put(
            `http://localhost:8090/user/psw/${userInfo.id}`,
            {
              newPsw: newPsw,
              actuelPsw: actuelPsw,
            }
          );
          console.log(responce.data);
          if (responce.data === "false")
            toast.error("Mode de passe actuel incorrecte");
          else {
            setNewPsw("");
            setActuelPsw("");
            setConfirmPsw("");
            toast.success("Votre mot de passe a été changé avec succès");
          }
        } catch (err) {
          console.log(err);
          toast.error("Quelque chose s'est mal passé");
        }
      }
    }
  };

  const eyeClick = (e) => {
    if (pswRef.current.type === "password") {
      e.target.classList.replace("uil-eye", "uil-eye-slash");
      pswRef.current.type = "text";
    } else {
      e.target.classList.replace("uil-eye-slash", "uil-eye");
      pswRef.current.type = "password";
    }
  };

  return (
    <Body>
      <NavbarAdmin userInfo={userInfo} />
      <SidebarAdmin />

      <Section>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            infoSubmit(e);
          }}
        >
          <div className="info">
            <h2>
              <i className="uil uil-info-circle"></i>
              Mes informations
            </h2>
            <div className="input-field">
              <h3>Nom et prénom</h3>
              <input
                disabled
                ref={nameInputRef}
                value={username}
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              ></input>
              <i
                ref={editNameIcon}
                className="uil uil-pen"
                onClick={penClickName}
              ></i>
            </div>
            <div className="input-field">
              <h3>Email</h3>
              <input
                disabled
                ref={emailInputRef}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <i
                ref={editEmailIcon}
                className="uil uil-pen"
                onClick={penClickEmail}
              ></i>
            </div>
            <button>Mettre à jour mes informations</button>
          </div>
        </Form>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            passwordSubmit(e);
          }}
        >
          <div className="security">
            <h2>
              <i className="uil uil-shield"></i>
              Compte et sécurité
            </h2>
            <div className="input-field">
              <h3>Mot de passe actuel</h3>
              <input
                type="password"
                value={actuelPsw}
                onChange={(e) => setActuelPsw(e.target.value)}
              ></input>
            </div>
            <div className="input-field">
              <h3>Nouveau mot de passe</h3>
              <input
                ref={pswRef}
                value={newPsw}
                type="password"
                onChange={(e) => setNewPsw(e.target.value)}
              />
              <i onClick={eyeClick} className="eye uil uil-eye"></i>
            </div>
            <div className="input-field">
              <h3>Confirmer le mot de passe</h3>
              <input
                type="password"
                value={confirmPsw}
                onChange={(e) => setConfirmPsw(e.target.value)}
              ></input>
            </div>
            <button>Changer le mot de passe</button>
          </div>
        </Form>
      </Section>
    </Body>
  );
};

const Form = styled.form`
  @media (max-width: 720px) {
    margin-left: 10px;
    margin-right: 10px;
  }
  user-select: none;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  .info {
    margin-top: 60px;
    h2 {
      font-weight: 400;
      color: #0076ff;
      i {
        margin-right: 10px;
        color: #555;
        font-size: 25px;
      }
    }
  }
  .input-field {
    position: relative;
    margin: 15px 0;
    h3 {
      font-weight: 400;
      font-size: 17px;
    }
    input {
      padding-left: 20px;
      font-size: 17px;
      height: 40px;
      margin-top: 5px;
      outline: none;
      border: 1px solid #bbb;
      border-radius: 5px;
      width: 100%;
    }
    i {
      position: absolute;
      cursor: pointer;
      right: 10px;
    }
    i.uil-eye,
    i.uil-eye-slash {
      bottom: 3px;
      font-size: 22px;
      color: #333;
    }
    i.uil-pen {
      color: #777;
      bottom: 6px;
      font-size: 19px;
    }
  }
  .security {
    margin-top: 40px;
    h2 {
      font-weight: 400;
      color: #0076ff;
      i {
        margin-right: 10px;
        color: #777;
        font-size: 25px;
      }
    }
  }
  button {
    padding: 10px;
    background-color: #0076ff;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }
`;

export default EditAdminProfil;
