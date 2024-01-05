/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import NavbarHome from "../components/NavbarHome";

const ViewService = () => {
  const { id } = useParams();

  const scrollRef = useRef();

  const [service, setService] = useState();
  const [popupRateTrigger, setPopupRateTrigger] = useState(false);
  const [newRate, setNewRate] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  const getService = async () => {
    await axios.get(`http://localhost:8090/service/${id}`).then((result) => {
      setService(result.data);
    });
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
    getService();
  }, []);

  //scroll to down conversation
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const signalService = async () => {
    const response = await axios.put(`http://localhost:8090/service/signal/${id}`);
    if (response.data === true) {
      toast.success("Service signalé avec succès");
    }
    else {
      toast.success("Echec");
    }
  };

  const rateClick = (rate) => {
    setNewRate(rate);
  };

  const sendRateClick = async () => {
    if(userInfo?.id !== service?.user?.id) {
      const response = await axios.put(
        `http://localhost:8090/service/rate/${id}/${newRate}`);
      if (response.data === "true") toast.success("Merci pour votre avis");
      getService();
    } else {
      toast.warning("Vous ne pouvez pas évoluer votre service");
    }
    setPopupRateTrigger(false);
    setNewRate(0);
  };

  const validClick = async () => {
    if (window.confirm("Etes vous sûr de vouloir valider ce service ?")) {
      await axios.put(`http://localhost:8090/service/valid/${service.id}`);
      getService();
      toast.success("Service validé");
    }
  };

  return (
    <div>
      {userInfo ? <Navbar userInfo={userInfo} /> : <NavbarHome />}
      <Service>
        {!service?.confirm && userInfo?.isAdmin && (
          <button className="valid-button" onClick={validClick}>
            Valider
          </button>
        )}
        <div className="blue">
          <div className="text">
            <h4>{service?.title}</h4>
            <div className="line">
              <span className="fa-solid fa-phone"></span>
              <span className="info">{service?.phone}</span>
            </div>
            <div className="line">
              <span className="fa-solid fa-location-dot"></span>
              <span className="info">{`${service?.government}, ${service?.delegation}`}</span>
            </div>
            <div className="line">
              <span className="fa-solid fa-location-dot"></span>
              <span className="info">{`Rue ${service?.street}`}</span>
            </div>
            {service?.description !== "" && <h6>Description :</h6>}
            <p>{service?.description}</p>
            <div className="rate">
              <i
                className={
                  service?.rate < 0.3
                    ? "icon-star-empty"
                    : service?.rate < 0.7
                    ? "icon-star-half"
                    : "icon-star-full"
                }
              ></i>
              <i
                className={
                  service?.rate < 1.3
                    ? "icon-star-empty"
                    : service?.rate < 1.7
                    ? "icon-star-half"
                    : "icon-star-full"
                }
              ></i>
              <i
                className={
                  service?.rate < 2.3
                    ? "icon-star-empty"
                    : service?.rate < 2.7
                    ? "icon-star-half"
                    : "icon-star-full"
                }
              ></i>
              <i
                className={
                  service?.rate < 3.3
                    ? "icon-star-empty"
                    : service?.rate < 3.7
                    ? "icon-star-half"
                    : "icon-star-full"
                }
              ></i>
              <i
                className={
                  service?.rate < 4.3
                    ? "icon-star-empty"
                    : service?.rate < 4.7
                    ? "icon-star-half"
                    : "icon-star-full"
                }
              ></i>
            </div>
          </div>
          {service?.servicePicture !== "" && (
            <div className="image">
              <img
                src={`/images/servicesImage/${service?.servicePicture}`}
                alt="serviceImage"
              />
            </div>
          )}
        </div>

        <div className="sideButtons">
          {userInfo &&
            userInfo?.id !== service?.user?.id &&
            !userInfo?.isAdmin && (
              <>
                <div className="icon" onClick={() => setPopupRateTrigger(true)}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <span className="nameact">Avis</span>
                <div className="icon" onClick={signalService}>
                  <i className="fa-solid fa-ban"></i>
                </div>
                <span className="nameact">Signaler</span>
              </>
            )}
        </div>
        <div className="socialMedia">
          {service?.fbLink !== "" && (
            <a href={service?.fbLink} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          )}
          {service?.instaLink !== "" && (
            <a href={service?.instaLink} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          )}
          {service?.ybLink !== "" && (
            <a href={service?.ybLink} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>
          )}
        </div>
      </Service>
      {popupRateTrigger && (
        <Popup>
          <div className="popup-inner">
            <div className="close">
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  setPopupRateTrigger(false);
                  setNewRate(0);
                }}
              ></i>
            </div>
            <h3>Donner votre Avis</h3>
            <div className="rate">
              <i
                className={newRate < 1 ? "icon-star-empty" : "icon-star-full"}
                onClick={() => rateClick(1)}
              ></i>
              <i
                className={newRate < 2 ? "icon-star-empty" : "icon-star-full"}
                onClick={() => rateClick(2)}
              ></i>
              <i
                className={newRate < 3 ? "icon-star-empty" : "icon-star-full"}
                onClick={() => rateClick(3)}
              ></i>
              <i
                className={newRate < 4 ? "icon-star-empty" : "icon-star-full"}
                onClick={() => rateClick(4)}
              ></i>
              <i
                className={newRate < 5 ? "icon-star-empty" : "icon-star-full"}
                onClick={() => rateClick(5)}
              ></i>
            </div>
            <button onClick={sendRateClick}>Envoyer</button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export const Popup = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200000;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  .popup-inner {
    position: relative;
    background-color: #fff;
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    border-radius: 10px;
    align-items: center;
    .close {
      position: absolute;
      right: 15px;
      top: 10px;
      color: #0077ff;
      font-size: 18px;
      cursor: pointer;
    }
    .rate {
      margin-bottom: 10px;
      i {
        font-size: 30px;
        color: #daa520;
      }
    }
    button {
      outline: none;
      border: none;
      background-color: #0077ff;
      color: #fff;
      padding: 7px 10px;
      border-radius: 5px;
      cursor: pointer;
      &.button-disabled {
        opacity: 0.7;
        cursor: default;
      }
    }
  }
  .cat-input {
    border: none;
    outline: none;
    text-align: center;
    caret-color: #0077ff;
    padding-bottom: 5px;
    margin-top: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid #0077ff;
    font-size: 18px;
  }
  .popup-inner.comment {
    display: block;
    width: 700px;
    padding: 50px 30px;
    height: fit-content;
    .comments-area {
      display: flex;
      flex-direction: column;
      gap: 30px;
      height: fit-content;
      max-height: 400px;
      width: 100%;
      padding: 10px;
      overflow-y: auto;
      background-color: #fff;
      border-radius: 5px;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      &::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      .no-comment {
        color: #0077ff;
        font-size: 18px;
        text-align: center;
        margin-top: 20px;
      }
    }
    .send-comment-area {
      margin-top: 25px;
      input {
        width: 100%;
        border: 1px solid rgba(14, 30, 37, 0.32);
        outline: none;
        border-radius: 20px;
        padding: 10px 15px;
      }
    }
  }
`;

export const Service = styled.div`
  z-index: 100;
  margin-top: 80px;
  height: calc(100vh - 90px);
  position: relative;
  .valid-button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #3cb371;
    border: none;
    outline: none;
    padding: 7px 20px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
  }
  .blue {
    width: 70%;
    height: 85%;
    padding-top: 130px;
    background-color: #0077ff;
    display: flex;
    position: relative;
    border-radius: 0 0px 10px 0;
  }
  .blue .text {
    padding-left: 100px;
    width: 600px;
    color: white;
  }
  .blue .text h4 {
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .blue .text .line {
    margin-left: 50px;
    margin-bottom: 7px;
    font-size: 18px;
    font-weight: 400;
  }
  .blue .text .line .info {
    margin-left: 10px;
  }
  .blue .text h6 {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 15px;
    margin-left: 35px;
  }
  .blue .text p {
    font-size: 17px;
    font-weight: 300;
    line-height: 1.2;
    margin-left: 50px;
    text-align: left;
  }

  .blue .image {
    width: 450px;
    position: absolute;
    right: -200px;
    top: calc(50%);
    transform: translateY(-50%);
  }
  .blue .image img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .sideButtons {
    position: absolute;
    width: 120px;
    color: white;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    text-align: center;
  }
  .sideButtons .icon {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border-radius: 50%;
    background-color: #0077ff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    cursor: pointer;
  }
  .sideButtons .icon:hover {
    background-color: white;
    color: #0077ff;
    transition: 1s;
  }
  .sideButtons .nameact {
    display: block;
    color: #0077ff;
    margin-bottom: 5px;
    font-size: 15px;
    font-weight: 500;
  }
  .socialMedia {
    display: flex;
    gap: 15px;
    width: fit-content;
    position: absolute;
    bottom: 10px;
    left: calc(50%);
    transform: translateX(-50%);
    font-size: 25px;
  }
  .socialMedia i {
    cursor: pointer;
  }
  .fa-facebook-f {
    color: blue;
  }
  .fa-instagram {
    color: rgb(222, 30, 155);
  }
  .fa-youtube {
    color: red;
  }
  .blue .rate {
    color: yellow;
    margin-left: 50px;
    margin-top: 15px;
  }
  .blue .rate i {
    margin-right: 5px;
    font-size: 18px;
  }
`;

export default ViewService;
