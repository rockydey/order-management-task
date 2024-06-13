import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Box } from "@chakra-ui/react";

const Main = () => {
  return (
    <Box  maxW={1280} marginX='auto'>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Main;
