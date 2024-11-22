import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context";
import Layout from "../components/Layout";
import Login from "../components/Login";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};

export default Router;
