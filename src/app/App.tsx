import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditorPage from "../pages/EditorPage/EditorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
