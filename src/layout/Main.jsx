import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Box } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  return (
    <Box maxW={1280} marginX='auto'>
      <Header />
      <Outlet />
      <ToastContainer />
    </Box>
  );
};

export default Main;
