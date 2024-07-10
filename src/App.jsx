import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Report from "./pages/Report";
import Report2 from "./pages/Report2";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/report' element={<Report />}></Route>
        <Route path='/report2' element={<Report2 />}></Route>
        <Route path='/login' element={<Login />}></Route>
        {/* <Route path='/dashboard' element={<Dashboard />}></Route> */}
        <Route path='/signup'></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;