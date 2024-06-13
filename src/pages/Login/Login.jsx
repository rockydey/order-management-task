import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <Box py='96px' maxW={420} mx='auto'>
      <form onSubmit={handleSubmit()}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
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
            id='password'
            placeholder='Password'
            {...register("password", {
              required: "Password is required",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          bg='#2ECA7F'
          _hover={{ bg: "#2ECA7F" }}
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'>
          Submit
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
