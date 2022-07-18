import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProductPage from "./pages/EditProductPage";
import AddProductPage from "./pages/AddProductPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import AddAdminPage from "./pages/AddAdminPage";
import Navbar from "./components/Navbar";
import LoginProtector from "./components/LoginProtector";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route
        path="/login"
        element={
          <LoginProtector>
            <LoginPage />
          </LoginProtector>
        }
      />
      <Route path="/products">
        <Route
          index
          path=""
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="add"
          element={
            <React.Fragment>
              <Navbar />
              <AddProductPage />
            </React.Fragment>
          }
        />
        <Route
          path=":productId/edit"
          element={
            <React.Fragment>
              <Navbar />
              <EditProductPage />
            </React.Fragment>
          }
        />
      </Route>
      <Route path="/categories">
        <Route
          index
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="add"
          element={
            <React.Fragment>
              <Navbar />
              <AddCategoryPage />
            </React.Fragment>
          }
        />
        <Route
          path=":categoryId/edit"
          element={
            <React.Fragment>
              <Navbar />
              <EditCategoryPage />
            </React.Fragment>
          }
        />
      </Route>
      <Route
        path="/add-admin"
        element={
          <ProtectedRoute>
            <AddAdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
