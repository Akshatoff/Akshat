import Hero from "./components/Hero";
import "./App.css";
import About from "./About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero></Hero>}></Route>
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
