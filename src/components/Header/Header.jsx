import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "./Header.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
// import FormComponent from "../FormComponent/FormComponent";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("products.json");
      return res.data;
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const _options = products.map((product) => ({
    value: product.name.toLowerCase(),
    product,
  }));

  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: _options,
  });

  const handleLogout = () => {
    logout().then(() => {
      toast.success("Logout successfully!");
    });
  };

  const handleSaleOrder = (data) => {};

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
              onClick={onOpen}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={24}
            fontWeight='bold'
            textAlign='center'
            textColor={"#2ECA7F"}
            mb={4}>
            Sale Order
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleSaleOrder)}>
              <FormControl bg={"#fff"}>
                <FormLabel htmlFor='select'>Products: </FormLabel>
                <MultiSelect
                  zIndex={100}
                  options={_options}
                  value={value}
                  onChange={onChange}
                />
              </FormControl>
              {/* {value.length !== 0 && <FormComponent register={register} selectProducts={value} />} */}
              {value.length !== 0 && (
                <Box mt={5}>
                  {value?.map((selectProduct, index) => (
                    <Box key={selectProduct.id}>
                      {selectProduct.product.sku?.map((selectSku, idx) => (
                        <Box mt={5} key={selectSku.sku_id}>
                          <Text fontWeight='bold' fontSize={20}>
                            SKU: {selectSku.sku_id}
                          </Text>
                          <FormControl mt={3}>
                            <FormLabel htmlFor='rate'>Selling Rate: </FormLabel>
                            <Input
                              type='number'
                              id='rate'
                              {...register(`rate-${idx}`)}
                              placeholder='Enter selling rate'
                            />
                          </FormControl>
                          <FormControl mt={3}>
                            <FormLabel htmlFor='items'>Total items: </FormLabel>
                            <Input
                              type='number'
                              id='items'
                              placeholder='Enter total items'
                              {...register(`items-${idx}`)}
                            />
                            <Text
                              textAlign='right'
                              fontSize={14}
                              textColor={"#2ECA7F"}>
                              {selectSku.quantity_in_inventory} items remaining
                            </Text>
                          </FormControl>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              )}
              {value.length !== 0 && (
                <FormControl mt={3}>
                  <FormLabel htmlFor='customerID'>Customer Id:</FormLabel>
                  <Input
                    type='text'
                    id='customerID'
                    {...register("customerID")}
                    placeholder='Enter customer id'
                  />
                </FormControl>
              )}
              <Button
                bg='#2ECA7F'
                _hover={{ bg: "#2ECA7F" }}
                mt={4}
                colorScheme='teal'
                display='block'
                ml='auto'
                isLoading={isSubmitting}
                type='submit'>
                Place Order
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
