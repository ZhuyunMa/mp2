import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";
import { SelectionProvider } from "./store/SelectionContext";
import "./main.css";

export default function App() {
  return (
    <BrowserRouter>
      <SelectionProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/pokemon/:name" element={<DetailView />} />
        </Routes>
      </SelectionProvider>
    </BrowserRouter>
  );
}
