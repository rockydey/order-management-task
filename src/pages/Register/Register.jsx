import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleRegister = (data) => {
    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Registered successfully!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box py='96px' maxW={420} mx='auto'>
      <form onSubmit={handleSubmit(handleRegister)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            id='name'
            placeholder='Name'
            {...register("name", {
              required: "Name is required",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.email}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            type='email'
            id='email'
            placeholder='Email'
            {...register("email", {
              required: "Email is required",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.password}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            type='password'
            id='password'
            placeholder='Password'
            {...register("password", {
              required: "Password is required",
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          bg='#2ECA7F'
          _hover={{ bg: "#2ECA7F" }}
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'>
          Register
        </Button>
      </form>
      <Text mt={4} display='flex' alignItems='center' gap={2}>
        Already have an account?
        <Link to='/login'>
          <Text color='#2ECA7F' fontWeight='medium'>
            Login Now
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default Register;
