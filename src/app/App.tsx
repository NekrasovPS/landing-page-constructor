import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditorPage from "../components/pages/EditorPage/EditorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
