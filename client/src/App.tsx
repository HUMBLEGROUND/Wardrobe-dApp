import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/Main";
import UserWallet from "./wallet/UserWallet";
import CreateAsset from "./asset/CreateAsset";
import ReadAsset from "./asset/ReadAsset";
import UpdateAsset from "./asset/UpdateAsset";
import DeleteAsset from "./asset/DeleteAsset";
import TransferAsset from "./asset/TransferAsset";
import Nav from "./pages/Nav";
function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<UserWallet />} />
          <Route path="/create" element={<CreateAsset />} />
          <Route path="/read" element={<ReadAsset />} />
          <Route path="/update" element={<UpdateAsset />} />
          <Route path="/delete" element={<DeleteAsset />} />
          <Route path="/transfer" element={<TransferAsset />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
