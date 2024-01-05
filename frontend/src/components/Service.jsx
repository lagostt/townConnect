import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Service = ({ service }) => {
  const navigate = useNavigate();

  return (
    <ServiceDiv
      key={service.phone}
      className={!service.confirm && "not-confirm"}
      onClick={() => navigate(`/view-service/${service.id}`)}
    >
      <div
        className="service-img"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.6) 100%), url('images/servicesImage/${service.servicePicture}')`,
        }}
      >
        <div className="service-infos">
          <h3>{service.title}</h3>
          <p>{service.category}</p>
          <p>{service.phone}</p>
          <p>
            <i className="uil uil-map-marker"></i>
            {`${service.government}, ${service.delegation}`}
          </p>
          <p>{`Rue: ${service.street}`}</p>
          <p>{`Numéro de municipalité: ${service.municipalityNumber}`}</p>
        </div>
      </div>
      <div className="more-info">
        <div className="rate">
          <i
            className={
              service.rate < 0.3
                ? "icon-star-empty"
                : service.rate < 0.7
                ? "icon-star-half"
                : "icon-star-full"
            }
          ></i>
          <i
            className={
              service.rate < 1.3
                ? "icon-star-empty"
                : service.rate < 1.7
                ? "icon-star-half"
                : "icon-star-full"
            }
          ></i>
          <i
            className={
              service.rate < 2.3
                ? "icon-star-empty"
                : service.rate < 2.7
                ? "icon-star-half"
                : "icon-star-full"
            }
          ></i>
          <i
            className={
              service.rate < 3.3
                ? "icon-star-empty"
                : service.rate < 3.7
                ? "icon-star-half"
                : "icon-star-full"
            }
          ></i>
          <i
            className={
              service.rate < 4.3
                ? "icon-star-empty"
                : service.rate < 4.7
                ? "icon-star-half"
                : "icon-star-full"
            }
          ></i>
        </div>
        <div className="social">
          {service.fbLink !== "" && (
            <a rel="noreferrer" href={service.fbLink} target="_blank">
              <i className="uil uil-facebook-f"></i>
            </a>
          )}
          {service.instaLink !== "" && (
            <a rel="noreferrer" href={service.instaLink} target="_blank">
              <i className="uil uil-instagram"></i>
            </a>
          )}
          {service.ybLink !== "" && (
            <a rel="noreferrer" href={service.ybLink} target="_blank">
              <i className="uil uil-youtube"></i>
            </a>
          )}
        </div>
      </div>
    </ServiceDiv>
  );
};

const ServiceDiv = styled.div`
  position: relative;
  z-index: 2;
  border: 1px solid #333;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.05);
  }
  &:hover + .edit-del {
    transform: translateY(-10px);
    opacity: 0;
  }

  &.not-confirm {
    opacity: 0.6;
  }
  &.not-confirm::before {
    position: absolute;
    width: 100%;
    text-align: center;
    line-height: 40px;
    border-radius: 0 0 50% 50%;
    z-index: 4;
    content: "En attente de validation...";
    background-color: #fff;
    height: 40px;
  }
  .service-img {
    width: 100%;
    height: 400px;
    background-size: cover !important;
    position: relative;
  }
  .service-infos {
    text-align: center;
    padding: 20px 30px;
    height: 180px;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    margin-top: auto;
    position: absolute;
    bottom: 0;
    border-radius: 30% 30% 0% 0%;
    h3 {
      color: #0077ff;
    }
  }
  .more-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    height: 50px;
    width: 100%;
    background-color: #fff;
    .rate {
      i {
        color: #b3a500;
        font-size: 18px;
      }
    }
    .social {
      i {
        font-size: 20px;
        margin-left: 20px;
        cursor: pointer;
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
  }
`;

export default Service;
