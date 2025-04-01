import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./services/navbar";
import { TaskCreate } from "./pages/TaskCreate";
import { TaskList } from "./pages/TaskList";
import { TaskUpdate, TaskUPdate } from "./pages/TaskUpdate";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/taskcreate" element={<TaskCreate />} />
        <Route path="" element={<TaskList />} />
        <Route path="/edit-task/:taskId" element={<TaskUpdate />} />


      </Routes>
    </Router>
  );
}

export default App;
