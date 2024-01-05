import React from "react";
import styled from "styled-components";
import axios from "axios";

const UsersTableAdmin = ({ users, viewAllClick }) => {
  const deleteUser = async (id) => {
    if (window.confirm("Etes vous sur de vouloir supprimer ce client ?")) {
      try {
        await axios.delete(`http://localhost:8090/user/${id}`);
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
          <th>Nom</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr className="no-result">
            <td>Pas d'utilisateur</td>
          </tr>
        ) : (
          users.map((e) => (
            <tr key={e.id}>
              <td className="name">
                <img src={`/images/usersImage/${e.profilePicture}`} alt="" />
                <p>{e.username}</p>
              </td>
              <td>{e.email}</td>
              <td>
                <div className="button del" onClick={() => deleteUser(e.id)}>
                  Supprimer
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
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
    top: -25px;
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
    top: 50%;
    width: 100%;
    color: #ff2400;
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
    min-width: 300px;
  }
  th:nth-child(3) {
    min-width: 250px;
    text-align: center;
  }
  th:last-child {
    width: 250px;
    text-align: center;
  }
  td:nth-child(3) {
    text-align: center;
  }
  td:first-child {
    text-transform: capitalize;
  }
  td:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transform: translateY(-60%);
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
      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
  .name {
    height: 60px;
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

export default UsersTableAdmin;
