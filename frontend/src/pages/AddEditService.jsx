import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Body } from "../pages/Profil";
import { data } from "../data/Data";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DropDown } from "../components/FilterServices";

const EditService = () => {
  //****Navigate****/
  let navigate = useNavigate();

  //****References****
  const govRef = useRef();
  const cityRef = useRef();
  const catRef = useRef();
  const optionsGRef = useRef();
  const optionsCRef = useRef();
  const optionsDRef = useRef();
  const selectGRef = useRef();
  const selectCRef = useRef();
  const selectDRef = useRef();
  const inputFileRef = useRef();
  const buttonFileRef = useRef();
  const textFileRef = useRef();

  //****States****
  const [categoriesList, setCategoriesList] = useState([]);
  const [gov, setGov] = useState("");
  const [city, setCity] = useState("");
  const [cat, setCat] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [numM, setNumM] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [ytb, setYtb] = useState("");
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState({
    profilePicture: "",
    email: "",
    username: "",
    id: "",
  });

  //****Logic****

  //****read params ****/
  const { id } = useParams();

  // **** Profil test & set states ****
  const getService = async (id) => {
    try {
      await axios.get(`http://localhost:8090/service/${id}`).then((result) => {
        setTitle(result.data.title);
        setPhone(result.data.phone);
        setDescription(result.data.description);
        setNumM(result.data.municipalityNumber);
        setStreet(result.data.street);
        setYtb(result.data.ybLink);
        setFb(result.data.fbLink);
        setInsta(result.data.instaLink);
        setGov(result.data.government);
        selectGRef.current.innerHTML = result.data.government;
        selectGRef.current.style.color = "#000";
        setCity(result.data.delegation);
        selectDRef.current.innerHTML = result.data.delegation;
        selectDRef.current.style.color = "#000";
        setCat(result.data.category);
        selectCRef.current.innerHTML = result.data.category;
        selectCRef.current.style.color = "#000";
      });
    } catch (err) {
      console.log(err);
      navigate("/profil-services");
    }
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")))
      navigate("/login-register");
    else {
      if (JSON.parse(localStorage.getItem("userInfo")).isAdmin)
        navigate("/admin-users");
      else {
        if (id) getService(id);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(data);
        const getCategories = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8090/categories"
            );
            setCategoriesList(response.data);
          } catch (err) {
            console.log(err);
          }
        };
        getCategories();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gov === "") {
      selectDRef.current.classList.add("ico");
      optionsDRef.current.classList.remove("active");
    } else {
      selectDRef.current.classList.remove("ico");
    }
  }, [gov]);

  // drop down functions
  function clickGDropDown() {
    optionsGRef.current.classList.toggle("active");
  }

  function clickCDropDown() {
    optionsCRef.current.classList.toggle("active");
  }

  function clickDDropDown() {
    optionsDRef.current.classList.toggle("active");
  }

  function clickGOption(e) {
    optionsGRef.current.classList.toggle("active");
    selectGRef.current.innerHTML = e.target.innerHTML;
    selectGRef.current.style.color = "#000";
    setGov(selectGRef.current.innerHTML);
    selectDRef.current.innerHTML = "Délégation";
    selectDRef.current.style.color = "#999";
  }

  function clickDOption(e) {
    optionsDRef.current.classList.toggle("active");
    selectDRef.current.innerHTML = e.target.innerHTML;
    selectDRef.current.style.color = "#000";
    setCity(selectDRef.current.innerHTML);
  }

  function clickCOption(e) {
    optionsCRef.current.classList.toggle("active");
    selectCRef.current.innerHTML = e.target.innerHTML;
    selectCRef.current.style.color = "#000";
    setCat(selectCRef.current.innerHTML);
  }

  useEffect(() => {
    if (file !== undefined) textFileRef.current.textContent = file.name;
    else textFileRef.current.textContent = "aucune image choisie";
  }, [file]);

  const addService = async () => {
    try {
      const formData = new FormData();
      formData.append("serviceImage", file);
      formData.append("userId", userInfo.id);
      formData.append("title", title);
      formData.append("category", cat);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("government", gov);
      formData.append("delegation", city);
      formData.append("street", street);
      formData.append("municipalityNumber", numM);
      formData.append("fbLink", fb);
      formData.append("ybLink", ytb);
      formData.append("instaLink", insta);
      await axios.post("http://localhost:8090/service", formData);
    } catch (err) {
      console.log(err);
    }
  };

  const editService = async () => {
    try {
      const formData = new FormData();
      formData.append("serviceImage", file);
      formData.append("title", title);
      formData.append("category", cat);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("government", gov);
      formData.append("delegation", city);
      formData.append("street", street);
      formData.append("municipalityNumber", numM);
      formData.append("fbLink", fb);
      formData.append("ybLink", ytb);
      formData.append("instaLink", insta);
      await axios.put(`http://localhost:8090/service/${id}`, formData);
    } catch (err) {
      console.log(err);
    }
  };

  const addEditClick = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      numM === "" ||
      cat === "" ||
      city === "" ||
      street === "" ||
      phone === ""
    )
      toast.info("Vous devez remplir les champs requis");
    else if (isNaN(Number(numM))) {
      toast.warning("le numéro de municipalité est invalide");
    } else {
      if (id) {
        editService();
        setTimeout(() => {
          navigate("/profil-services");
          toast.success("Votre service a été correctement modifiée");
        }, 500);
      } else {
        addService();
        setTimeout(() => {
          navigate("/profil-services");
          toast.success("Service ajouté avec succés");
        }, 500);
      }
    }
  };

  return (
    <Body>
      <Container>
        <Navbar userInfo={userInfo} />

        <Form>
          <h2>Information sur le service</h2>
          <div className="input-field">
            <h3>Titre*</h3>
            <input
              value={title}
              placeholder="Titre"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="input-field">
            <h3>Numéro de téléphone*</h3>
            <input
              value={phone}
              placeholder="Numéro de téléphone"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="input-field">
            <h3>Déscription</h3>
            <textarea
              value={description}
              placeholder="Déscription"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <DropDown ref={catRef} style={{ width: "100%" }}>
            <div className="select-box">
              <div ref={optionsCRef} className="options-container">
                {categoriesList.map((e) => (
                  <div key={e.id} className="option" onClick={clickCOption}>
                    {e.name}
                  </div>
                ))}
              </div>
              <div
                className="selected"
                ref={selectCRef}
                onClick={clickCDropDown}
              >
                Catégorie*
              </div>
            </div>
          </DropDown>

          <div className="input-field">
            <h3>Localisation*</h3>
            <DropDown ref={govRef} style={{ width: "100%", margin: "10px 0" }}>
              <div className="select-box">
                <div ref={optionsGRef} className="options-container">
                  {data.governorate.map((e) => (
                    <div key={e} className="option" onClick={clickGOption}>
                      {e}
                    </div>
                  ))}
                </div>
                <div
                  className="selected"
                  ref={selectGRef}
                  onClick={clickGDropDown}
                >
                  Gouvernerat
                </div>
              </div>
            </DropDown>

            <DropDown
              ref={cityRef}
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <div className="select-box">
                <div ref={optionsDRef} className="options-container">
                  {data?.city[gov]?.map((e) => (
                    <div key={e} className="option" onClick={clickDOption}>
                      {e}
                    </div>
                  ))}
                </div>
                <div
                  className="selected"
                  ref={selectDRef}
                  onClick={clickDDropDown}
                >
                  Délégation
                </div>
              </div>
            </DropDown>

            <input
              value={street}
              className="input"
              placeholder="Nom de rue"
              type="text"
              onChange={(e) => setStreet(e.target.value)}
            ></input>

            <input
              className="input"
              value={numM}
              placeholder="Numero de municipalité"
              type="text"
              onChange={(e) => setNumM(e.target.value)}
            ></input>
          </div>
          <div className="input-field">
            <h3>Réseaux sociaux</h3>
            <input
              value={fb}
              placeholder="Exp: https://www.facebook.com/...(optionnel)"
              type="text"
              onChange={(e) => setFb(e.target.value)}
            ></input>
            <i className="uil uil-facebook-f"></i>
          </div>

          <div className="input-field">
            <input
              value={insta}
              placeholder="Exp:https://www.instagram.com/...(optionnel)"
              type="text"
              onChange={(e) => setInsta(e.target.value)}
            ></input>
            <i className="uil uil-instagram"></i>
          </div>

          <div className="input-field">
            <input
              value={ytb}
              placeholder="Exp:https://www.youtube.com/...(optionnel)"
              type="text"
              onChange={(e) => setYtb(e.target.value)}
            ></input>
            <i className="uil uil-youtube"></i>
          </div>

          <div className="add-img">
            <input
              ref={inputFileRef}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              ref={buttonFileRef}
              onClick={(e) => {
                e.preventDefault();
                inputFileRef.current.click();
              }}
            >
              <i className="uil uil-camera-plus"></i>
              {id ? "Modifier l'image" : "Choisir une image"}
            </button>
            <span ref={textFileRef}>aucune image choisie</span>
          </div>

          <button
            className="submit"
            onClick={(e) => {
              e.preventDefault();
              addEditClick(e);
            }}
          >
            {id ? "Modifier ce service" : "Ajouter ce service"}
          </button>
        </Form>
      </Container>
      <Footer />
    </Body>
  );
};

export const Form = styled.form`
  user-select: none;
  @media (max-width: 720px) {
    margin-left: 10px;
    margin-right: 10px;
  }
  max-width: 700px;
  margin: 120px auto 60px;
  h2 {
    font-weight: 400;
    color: #0076ff;
  }
  .input-field {
    position: relative;
    margin: 15px 0;
    h3 {
      font-weight: 400;
      font-size: 17px;
      margin-bottom: 10px;
    }
    input {
      padding-left: 20px;
      padding-right: 50px;
      font-size: 17px;
      height: 40px;
      margin-top: 5px;
      outline: none;
      border: 1px solid #bbb;
      border-radius: 5px;
      width: 100%;
      &::placeholder {
        font-size: 15px;
        color: #999;
      }
    }
    textarea {
      height: 200px;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      margin-top: 5px;
      resize: none;
      outline: none;
      border: 1px solid #bbb;
      border-radius: 5px;
    }
    .input {
      border-color: #ccc;
      margin-bottom: 10px;
      height: 47px;
      &::placeholder {
        color: #999;
        font-size: 15px;
      }
    }
    i {
      position: absolute;
      bottom: 5px;
      font-size: 20px;
      right: 15px;
    }
    i.uil-facebook-f {
      color: #4267b2;
    }
    i.uil-instagram {
      color: #e1306c;
    }
    i.uil-youtube {
      color: #ff0000;
    }
  }
  .add-img {
    height: 40px;
    margin-top: 30px;
    display: flex;
    input {
      display: none;
    }
    button {
      cursor: pointer;
      background-color: #daa520;
      outline: none;
      border: none;
      height: 100%;
      color: #fff;
      width: 220px;
      font-size: 15px;
      margin-right: 10px;
      font-weight: bold;
      i {
        margin-right: 5px;
        color: #fff;
      }
    }
    span {
      display: block;
      height: 100%;
      color: #999;
      width: 100%;
      line-height: 40px;
      border-bottom: 1px solid #daa520;
    }
  }
  .submit {
    cursor: pointer;
    margin-top: 50px;
    display: block;
    padding: 10px;
    background-color: rgba(0, 118, 255, 1);
    outline: none;
    border: none;
    color: #f5f5f5;
    border-radius: 5px;
    width: 100%;
    font-size: 18px;
  }
`;

export default EditService;
