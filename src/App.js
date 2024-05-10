import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Home from "./pages/Home/home";
import TodoPage from "./pages/TodoPage/todoPage";
import NewProject from "./pages/NewProject/NewProject";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project/:id" element={<TodoPage />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
