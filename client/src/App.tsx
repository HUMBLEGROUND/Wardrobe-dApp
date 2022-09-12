import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/Main";
import AdminWallet from "./wallet/AdminWallet";
import UserWallet from "./wallet/UserWallet";
import CreateAsset from "./asset/CreateAsset";
import ReadAsset from "./asset/ReadAsset";
import UpdateAsset from "./asset/UpdateAsset";
import DeleteAsset from "./asset/DeleteAsset";
import TransferAsset from "./asset/TransferAsset";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<AdminWallet />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<UserWallet />} />
        </Routes>
        <Routes>
          <Route path="/create" element={<CreateAsset />} />
        </Routes>
        <Routes>
          <Route path="/read" element={<ReadAsset />} />
        </Routes>
        <Routes>
          <Route path="/update" element={<UpdateAsset />} />
        </Routes>
        <Routes>
          <Route path="/delete" element={<DeleteAsset />} />
        </Routes>
        <Routes>
          <Route path="/transfer" element={<TransferAsset />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
