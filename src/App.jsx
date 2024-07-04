import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Report from "./pages/Report";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/report' element={<Report />}></Route>
        <Route path='/signin'></Route>
        <Route path='/signup'></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;