import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Icon,
  FormErrorMessage,
} from '@chakra-ui/core';

import { createArticle, login } from '../api';
import { NavBar } from '../components/layout/NavBar';
import { useIsAuth } from '../utils/useIsAuth';
import { Layout } from '../components/layout/Layout';

const Login = () => {
  useIsAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Layout variant='regular'>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow='lg'>
        <Box textAlign='center'>
          <Heading>Create Article</Heading>
        </Box>
        <Box my={4} textAlign='left'>
          <Formik
            initialValues={{
              title: '',
              caption: '',
              body: '',
              tagList: '',
              image: null,
            }}
            onSubmit={async (values, { setErrors }) => {
              try {
                const { data } = await createArticle({
                  ...values,
                  tagList: values.tagList.split(','),
                });
                if (data) {
                  await router.push('/');
                }
              } catch (err) {
                if (err?.response?.data?.errors) {
                  const errors = err?.response?.data?.errors;
                  Object.keys(errors).map((key) => {
                    setErrors({ [key]: errors[key] });
                  });
                }
              }
            }}
          >
            {({ isSubmitting, handleChange, errors, touched }) => (
              <Form>
                <Button
                  leftIcon='plus-square'
                  variantColor='blue'
                  variant='outline'
                >
                  Choose Optional Splash Image
                </Button>
                <FormControl mt={6} isInvalid={errors.title && touched.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder='Title'
                    size='lg'
                    name='title'
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={6}
                  isInvalid={errors.caption && touched.caption}
                >
                  <FormLabel>Caption</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder='Caption'
                      size='lg'
                      name='caption'
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.caption}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt={6}
                  isInvalid={errors.caption && touched.caption}
                >
                  <FormLabel>Body</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder='Insert your article here...'
                      size='lg'
                      name='body'
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.body}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt={6}
                  isInvalid={errors.tagList && touched.tagList}
                >
                  <FormLabel>Tags</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder='A list of tags, seperated by commas'
                      size='lg'
                      name='tagList'
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.tagList}</FormErrorMessage>
                </FormControl>
                <Button
                  variantColor='blue'
                  variant='outline'
                  type='submit'
                  width='full'
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Submit Article
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
