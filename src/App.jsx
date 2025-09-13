import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        ;
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
