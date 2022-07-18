import LandingPage from "./pages/LandingPage.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import ProductsPage from "./pages/ProductsPage.js";
import DetailPage from "./pages/DetailPage.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<DetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
