import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import StatAdmin from "../components/StatAdmin";
import { Section, Body } from "./AdminUsers";
import styled from "styled-components";
import { Popup } from "./ViewService";
import { toast } from "react-toastify";

const AdminCategories = () => {
  const navigate = useNavigate();

  const homeRef = useRef();

  const [userInfo, setUserInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [catName, setCatName] = useState("");

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        getAllCategories();
      } else {
        navigate("/profil");
      }
    }
  }, [navigate]);

  const getAllCategories = async () => {
    try {
      await axios.get("http://localhost:8090/categories").then((result) => {
        setCategories(result.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchFunction = async (category) => {
    try {
      await axios
        .get("http://localhost:8090/categories")
        .then((result) =>
          setCategories(
            result.data.filter((e) =>
              e.name.toLowerCase().includes(category.toLowerCase())
            )
          )
        );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      if (
        window.confirm("Etes vous sûr de vouloir supprimer cette catégorie ?")
      ) {
        await axios.delete(`http://localhost:8090/category/${id}`);
        getAllCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:8090/categories");
    if (
      response.data.filter(
        (e) => e.name.toLowerCase() === catName.toLowerCase()
      ).length === 0
    ) {
      try {
        const name = catName[0]
          .toUpperCase()
          .concat(catName.slice(1).toLocaleLowerCase());
        await axios.post("http://localhost:8090/category", { name: name });
        setPopupTrigger(false);
        toast.success("Categorie ajouté avec succés");
        getAllCategories();
        setCatName("");
      } catch (err) {
        console.log(err);
      }
    } else {
      setPopupTrigger(false);
      setCatName("");
      toast.info("Cette catégorie existe déja");
    }
  };

  return (
    <Body>
      <NavbarAdmin userInfo={userInfo} searchFunction={searchFunction} />
      <SidebarAdmin />
      <Section ref={homeRef} className="home">
        <StatAdmin />
        <Categories>
          <div className="add-cat">
            <p>Les catégories</p>
            <button onClick={() => setPopupTrigger(true)}>Ajouter</button>
          </div>
          <div className="cat-list">
            {categories.map((e) => (
              <div key={e.id}>
                <p>{e.name}</p>
                <i
                  className="uil uil-trash"
                  title="Supprimer"
                  onClick={() => deleteCategory(e.id)}
                ></i>
              </div>
            ))}
          </div>
        </Categories>
      </Section>
      {popupTrigger && (
        <Popup>
          <div className="popup-inner">
            <div className="close">
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  setPopupTrigger(false);
                }}
              ></i>
            </div>
            <h3>Saisir le nom de la catégorie: </h3>
            <form onSubmit={addCategory}>
              <input
                className="cat-input"
                autoFocus
                type="text"
                onChange={(e) => setCatName(e.target.value)}
                value={catName}
              />
            </form>

            <button
              onClick={(e) => {
                if (catName !== "") {
                  addCategory(e);
                }
              }}
              className={catName === "" ? "button-disabled" : ""}
            >
              Confirmer
            </button>
          </div>
        </Popup>
      )}
    </Body>
  );
};

const Categories = styled.div`
  margin: 100px 0 0 100px;
  width: fit-content;
  .add-cat {
    display: flex;
    gap: 50px;
    padding: 10px 15px;
    margin-bottom: 20px;
    border-radius: 7px;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    button {
      border: none;
      background-color: #0077ff;
      color: #fff;
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 7px;
      cursor: pointer;
    }
    p {
      font-size: 18px;
    }
  }
  .cat-list {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #fff;
    div {
      position: relative;
      padding: 15px 50px 15px 15px;
      border-bottom: 1px solid #ccc;
      i {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        color: #ff2400;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          transform: translateY(-50%) rotateY(180deg);
          transform-origin: center;
        }
      }
    }
    div:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
      background-color: #088f8f;
    }
  }
`;

export default AdminCategories;
