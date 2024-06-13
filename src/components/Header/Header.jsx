import {
  Box,
  Button,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "./Header.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout().then(() => {
      toast.success("Logout successfully!");
    });
  };

  return (
    <Box>
      <Box
        display='flex'
        justifyContent='space-between'
        paddingY={5}
        alignItems='center'
        fontSize={20}
        fontWeight='medium'>
        <UnorderedList ml={0} display='flex' listStyleType='none' gap={5}>
          <ListItem>
            <NavLink to='/'>Active Sale Orders</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to='/complete-sale'>Complete Sale Orders</NavLink>
          </ListItem>
        </UnorderedList>
        <Box display='flex' alignItems='center' gap={5}>
          <Box>
            <Button onClick={() => toggleColorMode()}>
              {colorMode === "dark" ? <FaSun /> : <FaMoon />}
            </Button>
          </Box>
          <Box>
            <Button
              bg='#2ECA7F'
              color='#fff'
              fontSize={20}
              _hover={{ bg: "#2ECA7F" }}
              gap={1}>
              <FaPlus /> Sale Order
            </Button>
          </Box>
          {user ? (
            <Box>
              <Button
                onClick={handleLogout}
                border='2px'
                px={4}
                borderRadius='md'
                color='#2ECA7F'
                borderColor='#2ECA7F'
                fontSize={20}
                bg='#fff'
                _hover={{ bg: "#fff" }}>
                Logout
              </Button>
            </Box>
          ) : (
            <Link to='/login'>
              <Text
                border='2px'
                px={4}
                py={1}
                borderRadius='md'
                color='#2ECA7F'
                borderColor='#2ECA7F'>
                Login
              </Text>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
