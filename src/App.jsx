import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Main from "./pages/Main";
import Report from "./pages/Report";
import Report2 from "./pages/Report2";
import Login from "./pages/login/Login";
import Notification from './pages/notification/Notification';
import Write from "./pages/notification/Write";
import Statspage from './pages/Statspage';
import ReportDetails from './pages/ReportDetails';
import FindID from './pages/findID/FindID';
import SignUp from './pages/signup/SignUp';
import ChangePW from './pages/changePW/changePW';
import CallReport from './pages/callReport/CallReport'
import ReportContent from './pages/callReport/ReportContent'

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
          <Route path='/signup' element={<SignUp />} />
          <Route path="/notification" element={<Notification />} />
          <Route path='/notification/write' element={<Write />} />
          <Route path="/statspage" element={<Statspage />} />
          <Route path='/report-details' element={<ReportDetails />}></Route>
          <Route path="/findid" element={<FindID />} />
          <Route path="/changepw" element={<ChangePW />} />
          <Route path='/callreport' element={<CallReport />} />
          <Route path='/reportcontent/:id' element={<ReportContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
