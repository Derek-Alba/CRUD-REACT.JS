import { Route, Routes } from "react-router-dom";
import Client from "../../pages/client";
import Users from "../../pages/users";
import NavBar from "../NavBar";
import Notas from "../../pages/notas";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/client" element={<Client />} />
          <Route path="/nota" element={<Notas />} />
        </Routes>
      </div>
    </>
  );
};

export default Layout;
