import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavbarAdmin = ({ userInfo, searchFunction }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const profilMenuRef = useRef();

  const [search, setSearch] = useState("");

  // **** Disconnect ****/
  const disconnectClick = (e) => {
    localStorage.removeItem("userInfo");
    navigate("/login-register");
  };

  function profilClick() {
    profilMenuRef.current.style.transform = "scale(100%)";
  }

  function closeClick() {
    profilMenuRef.current.style.transform = "scale(0%)";
  }

  function searchClick(e) {
    e.preventDefault();
    setSearch("");
    searchFunction(search);
  }

  return (
    <Navbar>
      <div className="admin">
        <div className="profil" onClick={profilClick}>
          <img src={`/images/profil-admin.png`} alt="ProfilImage" />
          <div className="name-email">
            <h3>{userInfo?.username}</h3>
            <p>{userInfo?.email}</p>
          </div>
          <i className="uil uil-angle-down"></i>
        </div>
      </div>
      <div className="profil-menu" ref={profilMenuRef}>
        <i className="uil uil-times" onClick={closeClick}></i>
        <div className="choise">
          <i className="uil uil-user"></i>
          <Link className="link" to="/edit-admin">
            <li>Mon Compte</li>
          </Link>
        </div>
        <div className="choise">
          <i className="uil uil-signout"></i>
          <div onClick={disconnectClick}>
            <li>Se déconnecter</li>
          </div>
        </div>
      </div>
      {location.pathname !== "/edit-admin" && (
        <form onSubmit={searchClick}>
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              placeholder="Chercher un utilisateur"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      )}
    </Navbar>
  );
};

export const Navbar = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
  background-color: #084e64;
  height: 60px;
  &:after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    top: 35px;
    left: 210px;
    transform: rotate(45deg);
    background-color: #084e64;
  }
  .search {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    display: flex;
    input {
      width: 100%;
      height: 30px;
      padding-left: 40px;
      outline: none;
      border: none;
    }
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(calc(-50% - 230px), -50%);
      color: #084e64;
    }
  }
  .admin {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .profil {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    gap: 7px;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .name-email {
      overflow: hidden;
      width: 170px;
      line-height: 1.3;
      h3 {
        font-size: 15px;
        color: #fff;
      }
      p {
        font-size: 15px;
        color: #fff;
      }
    }
    i {
      font-size: 22px;
      color: #fff;
    }
  }

  .profil-menu {
    background-color: #fff;
    z-index: 500;
    transform: scale(0%);
    transition: 0.2s;
    width: 250px;
    position: absolute;
    right: 0px;
    top: 60px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    overflow: hidden;
    margin-right: 10px;
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
  }
`;

export default NavbarAdmin;
