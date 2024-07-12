import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Main from "./pages/Main";
import Report from "./pages/Report";
import Report2 from "./pages/Report2";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard";
import Notification from './pages/NotificationPage'; // Notification 경로
import Statspage from './pages/Statspage'; // Stats 경로

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/main' element={<Main />} />
          <Route path='/report' element={<Report />} />
          <Route path='/report2' element={<Report2 />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          <Route path='/signup' />
          <Route path="/notification" element={<Notification />} /> {/* Notification 경로 */}
          <Route path="/statspage" element={<Statspage />} /> {/* Stats 경로 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
