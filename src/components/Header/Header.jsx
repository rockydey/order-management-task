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

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
          <Link>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
