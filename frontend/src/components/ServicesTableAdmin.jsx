import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ServicesTableAdmin = ({ services, viewAllClick }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const deleteService = async (id) => {
    if (window.confirm("Etes vous sur de vouloir supprimer ce service ?")) {
      try {
        await axios.delete(`http://localhost:8090/service/${id}`);
        viewAllClick();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Table>
      <thead>
        <tr onClick={viewAllClick}>
          <td>Voir tout</td>
        </tr>
        <tr>
          <th>Nom de service</th>
          <th>Catégorie</th>
          <th>Identifiant du propriétaire</th>
          <th>Nombre de signalements</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {services?.length === 0 ? (
          location.pathname === "/admin-all-services" ? (
            <tr className="no-result">
              <td>Pas de service</td>
            </tr>
          ) : (
            <tr className="no-result not-valid">
              <td>Pas de service non valide</td>
            </tr>
          )
        ) : (
          services?.map((e) => (
            <tr className={!e.confirm ? "color-not-valid" : ""} key={e.id}>
              <td>{e.title}</td>
              <td>{e.category}</td>
              <td>{e.user.username}</td>
              <td>{e.signal}</td>
              <td>
                <div
                  className="button del"
                  onClick={() => deleteService(e.id)}
                >
                  Supprimer
                </div>
                {e.nbServices !== 0 && (
                  <div className="button view">
                    <div
                      className="link"
                      onClick={() => navigate(`/view-service/${e.id}`)}
                    >
                      Voir service
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export const Table = styled.table`
  position: relative;
  user-select: none;
  padding: 0 10px;
  margin: 100px auto 0;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  tr {
    height: 60px;
    position: relative;
  }
  thead tr:first-child {
    position: absolute;
    right: 0;
    top: -40px;
  }
  thead tr:first-child td {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0077ff;
    color: #fff;
    border-radius: 0 5px 0 5px;
    height: 30px;
    width: 80px;
    cursor: pointer;
  }
  thead tr:nth-child(2) {
    height: 40px;
  }
  .no-result td {
    position: absolute;
    left: 0;
    width: 100%;
    color: #ff2400;
  }
  .not-valid td {
    color: #3cb371;
  }
  tbody tr.color-not-valid td {
    color: #088f8f;
  }
  tbody tr:not(:last-child)::after,
  thead tr:last-child::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: #ccc;
  }
  th {
    padding: 5px;
    text-align: left;
  }
  th:first-child {
    min-width: 250px;
  }
  th:nth-child(2) {
    min-width: 200px;
  }
  th:nth-child(3) {
    min-width: 270px;
  }
  th:nth-child(4) {
    min-width: 220px;
  }
  th:last-child {
    width: 300px;
    text-align: center;
  }
  tbody td:first-child {
    padding-left: 10px;
  }
  td:nth-child(4) {
    text-align: center;
  }
  .color-not-valid {
    color: #088f8f;
  }
  tbody td:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transform: translateY(60%);
    .button {
      font-size: 13.5px;
      padding: 3px 5px;
      border-radius: 7px;
      color: #fff;
      &.view {
        background-color: #088f8f;
      }
      &.del {
        background-color: #ff2400;
      }
      .link {
        text-decoration: none;
        color: #fff;
      }
    }
  }
`;

export default ServicesTableAdmin;
