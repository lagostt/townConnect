import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfil from "./pages/EditProfil";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import Profil from "./pages/Profil";
import ProfilServices from "./pages/ProfilServices";
import AddEditService from "./pages/AddEditService";
import AdminUsers from "./pages/AdminUsers";
import EditAdminProfil from "./pages/EditAdminProfil";
import AdminServices from "./pages/AdminServices";
import AdminNotValid from "./pages/AdminNotValid";
import AdminCategories from "./pages/AdminCategories";
import ViewService from "./pages/ViewService";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/edit-profil" element={<EditProfil />} />
        <Route path="/profil-services" element={<ProfilServices />} />
        <Route path="/add-edit-service" element={<AddEditService />} />
        <Route path="/add-edit-service/:id" element={<AddEditService />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/edit-admin" element={<EditAdminProfil />} />
        <Route path="/view-service/:id" element={<ViewService />} />
        <Route path="/admin-categories" element={<AdminCategories />} />
        <Route path="/admin-all-services/:id" element={<AdminServices />} />
        <Route path="/admin-all-services" element={<AdminServices />} />
        <Route path="/admin-not-valid" element={<AdminNotValid />} />
      </Routes>
    </>
  );
};

export default App;
