import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import store from "../redux/store";

const NavbarHome = (props) => {
  const navigate = useNavigate();

  const location = useLocation();

  // ****States****
  const [searchGlobal, setSearchGlobal] = useState("");

  //search function
  const searchGlobalClick = (e) => {
    e.preventDefault();
    store.dispatch({
      type: "SEARCH_SERVICES",
      payload: { searchValue: searchGlobal },
    });

    if (location.pathname !== "/") navigate("/");
    else {
      props.setServicesFunction();
    }
  };

  const connectionClick = () => {
    store.dispatch({ type: "CLEAR" });
    navigate("/login-register");
  };

  return (
    <Navbar>
      <Link to="/">
        <img src="/images/logo.png" alt="logo" />
      </Link>
      <form onSubmit={searchGlobalClick}>
        <div className="search">
          <input
            type="text"
            value={searchGlobal}
            onChange={(e) => setSearchGlobal(e.target.value)}
          />
          <button onClick={searchGlobalClick}>
            <i className="uil uil-search"></i>
          </button>
        </div>
      </form>
      <div className="link" onClick={connectionClick}>
        <div className="sign-login">
          <i className="icon-enter" />
          <p>Conexion/Inscription</p>
        </div>
      </div>
    </Navbar>
  );
};

export const Navbar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #f1f1f1;
  z-index: 1000;
  user-select: none;
  height: 60px;
  padding: 5px 15px 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.3);
  @media (max-width: 769px) {
    gap: 25px;
  }
  @media (max-width: 500px) {
    gap: 10px;
  }

  a {
    height: 100%;
    @media (max-width: 769px) {
      height: 80%;
    }
    @media (max-width: 500px) {
      height: 70%;
    }
    img {
      height: 100%;
    }
  }

  form {
    max-width: 600px;
    width: 100%;
    .search {
      border: 1px solid #999;
      height: 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      overflow: hidden;
      input {
        width: 100%;
        outline: none;
        border-radius: 5px;
        border: none;
        padding: 5px 20px;
        font-size: 15px;
      }

      button {
        border: none;
        background-color: #0076ff;
        height: 100%;
        width: 60px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        @media (max-width: 500px) {
          width: 45px;
        }
      }
    }
  }

  .link {
    margin-right: 10px;
    text-decoration: none;
    height: fit-content;
    transition: 0.5s;
    &:hover {
      transform: scale(95%);
    }
    .sign-login {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        color: #000;
        font-size: 17px;
        &:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          display: none;
        }
      }
      i {
        font-size: 19px;
        color: #0076ff;
        @media (max-width: 768px) {
          margin-left: 40px;
          font-size: 22px;
        }
      }
    }
  }
`;

export default NavbarHome;
