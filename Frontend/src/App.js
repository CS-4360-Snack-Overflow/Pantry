import React from "react";
import GlobalStyles from 'styles/GlobalStyles';

import HomePage from "pages/HomePage.js";
import RecipeSearchPage from "pages/RecipeSearchPage.js";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import AboutUsPage from "pages/AboutUs.js";
import ContactUsPage from "pages/ContactUs.js";
import AddRecipePage from "pages/AddRecipe";
import ComponentRenderer from "ComponentRenderer.js";
import UserPage from "pages/User.js";
import EditUser from "pages/EditUser.js";
import RecipeDetails from "pages/RecipeDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/components/:type/:subtype/:name" element={<ComponentRenderer />} />
          <Route path="/components/:type/:name" element={<ComponentRenderer />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/recipes" element={<RecipeSearchPage />} />
          <Route path="/addrecipe" element={<AddRecipePage />} />
          <Route path="/recipedetails" element={<RecipeDetails />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/EditUser" element={<EditUser/>} />
        </Routes>
      </Router>
    </>
  );
}
