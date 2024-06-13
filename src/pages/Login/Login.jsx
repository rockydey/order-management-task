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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;

    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Logged in successfully!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <Box py='96px' maxW={420} mx='auto'>
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl isInvalid={errors.email}>
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
          Login
        </Button>
      </form>
      <Text mt={4} display='flex' alignItems='center' gap={2}>
        Do not have an account?
        <Link to='/register'>
          <Text color='#2ECA7F' fontWeight='medium'>
            Register Now
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
