import React, { useRef, useState } from "react";
import styled from "styled-components";
import store from "../redux/store";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = (props) => {
  //**** location ****
  const location = useLocation();

  //**** navigation ****
  const navigate = useNavigate();

  // ****References****
  const profilMenuRef = useRef();

  // ****States****
  const [searchGlobal, setSearchGlobal] = useState("");

  const clearStore = () => {
    store.dispatch({ type: "CLEAR" });
  };

  // **** Disconnect ****
  const disconnectClick = (e) => {
    localStorage.removeItem("userInfo");
    clearStore();
    navigate("/login-register");
  };

  // ****search function ****
  const searchGlobalClick = (e) => {
    e.preventDefault();
    store.dispatch({
      type: "SEARCH_SERVICES",
      payload: { searchValue: searchGlobal },
    });
    if (location.pathname !== "/profil") navigate("/profil");
    else props.setServicesFunction();
  };

  //****profil menu functions****
  function profilClick() {
    profilMenuRef.current.style.transform = "scale(100%)";
  }

  function closeClick() {
    profilMenuRef.current.style.transform = "scale(0%)";
  }

  return (
    <NavbarDiv>
      <Link to="/profil">
        <img src="/images/logo.png" alt="logo" />
      </Link>
      <form>
        <div className="search">
          <input
            type="text"
            accept="image/*"
            onChange={(e) => setSearchGlobal(e.target.value)}
          />
          <button onClick={searchGlobalClick}>
            <i className="uil uil-search"></i>
          </button>
        </div>
      </form>
      <div className="right">
        {!props.userInfo?.isAdmin && (
          <>
            <Link to="/profil">
              <i className="uil uil-estate"></i>
            </Link>
          </>
        )}
        <div className="profil" onClick={profilClick}>
          <img
            src={`/images/usersImage/${props.userInfo?.profilePicture}`}
            alt="ProfilImage"
          />
          <div className="name-email">
            <h3>{props.userInfo?.username}</h3>
            <p>{props.userInfo?.email}</p>
          </div>
          <i className="uil uil-angle-down"></i>
        </div>
      </div>
      <div className="profil-menu" ref={profilMenuRef}>
        <i className="uil uil-times" onClick={closeClick}></i>
        <div className="choise">
          <i className="uil uil-user"></i>
          <Link className="link" to="/edit-profil" onClick={clearStore}>
            <li>Mon Compte</li>
          </Link>
        </div>
        <div className="choise">
          <i className="icon-room_service"></i>
          <Link className="link" to="/profil-services" onClick={clearStore}>
            <li>Mes Services</li>
          </Link>
        </div>
        <div className="choise">
          <i className="uil uil-signout"></i>
          <div onClick={disconnectClick}>
            <li>Se déconnecter</li>
          </div>
        </div>
      </div>
    </NavbarDiv>
  );
};

//****styled componnents ****
export const NavbarDiv = styled.nav`
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
  .right {
    display: flex;
    align-items: center;
    gap: 10px;
    i {
      font-size: 25px;
      color: #0077ff;
      cursor: pointer;
    }
  }
  .profil {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    &:active {
      background-color: #eee;
    }
    gap: 7px;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    .name-email {
      overflow: hidden;
      width: 170px;
      line-height: 1.3;
      h3 {
        font-size: 15px;
        color: #0076ff;
      }
      p {
        font-size: 15px;
        color: #777;
      }
    }
    i {
      font-size: 22px;
      color: #0076ff;
    }
  }
  @media (max-width: 769px) {
    .profil {
      gap: 2px;
      .name-email {
        display: none;
      }
    }
  }
  @media (max-width: 500px) {
    .profil {
      gap: 0;
      .name-email {
        display: none;
      }
    }
  }

  .profil-menu {
    background-color: #fff;
    z-index: 500;
    transform: scale(0%);
    transition: 0.2s;
    width: 250px;
    position: absolute;
    right: 20px;
    top: 60px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    overflow: hidden;
    border-radius: 10px;

    .choise {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      gap: 10px;
      cursor: pointer;
      border-bottom: 1px solid #ddd;
      transition: 0.5s;
      &:hover {
        padding: 15px 20px 15px 25px;
      }

      li {
        list-style-type: none;
        color: #666;
      }

      i {
        color: #0076ff;
      }

      .link {
        text-decoration: none;
      }
    }

    i.uil-times {
      position: absolute;
      right: 0;
      padding: 5px;
      font-size: 20px;
      cursor: pointer;
    }
    @media (max-width: 500px) {
      padding-top: 10px;
      width: 100%;
      right: 0;
      i.uil-times {
        right: 5px;
        top: -5px;
        font-size: 25px;
      }
    }
  }
`;

export default Navbar;
