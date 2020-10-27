import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  PseudoBox,
  useToast,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import NextLink from 'next/link';
import { mutate } from 'swr';
import { updateUser } from '../api';
import { useGetCurrentUser } from '../api/useGetCurrentUser';
import { InputField } from '../components/common/InputField';
import { NavBar } from '../components/layout/NavBar';
import { UserSchema } from '../utils/schemas/user.schema';
import { useIsAuth } from '../utils/useIsAuth';

const Account = () => {
  useIsAuth();
  const toast = useToast();
  const { user, isLoading } = useGetCurrentUser();
  const inputFile = useRef(null);
  const [imageUrl, setImageUrl] = useState(user?.image);

  if (isLoading || !user) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Flex width="full" align="center" justifyContent="center" my="10">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Account Settings</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{
                email: user.email,
                username: user.username,
                bio: user.bio,
                image: null,
              }}
              validationSchema={UserSchema}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const formData = new FormData();
                  formData.append('email', values.email);
                  formData.append('bio', values.bio);
                  formData.append('username', values.username);
                  formData.append(
                    'image',
                    values.image ? values.image : imageUrl
                  );
                  const { data } = await updateUser(formData);
                  if (data) {
                    mutate('/users', data);
                    toast({
                      title: 'Account updated.',
                      description: 'Successfully updated your account',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    });
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
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <Flex align="center" justify="center" mb="4">
                    <PseudoBox _hover={{ cursor: 'pointer', opacity: 0.5 }}>
                      <Avatar
                        src={imageUrl || user.image}
                        size="2xl"
                        onClick={() => inputFile.current.click()}
                      />
                    </PseudoBox>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      ref={inputFile}
                      hidden
                      onChange={async (e) => {
                        if (!e.currentTarget.files) return;
                        setFieldValue('image', e.currentTarget.files[0]);
                        setImageUrl(
                          URL.createObjectURL(e.currentTarget.files[0])
                        );
                      }}
                    />
                  </Flex>

                  <InputField
                    value={values.email}
                    type="email"
                    placeholder="Email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />

                  <InputField
                    value={values.username}
                    placeholder="Username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />

                  <InputField
                    value={values.bio}
                    textarea
                    placeholder="Tell us about yourself..."
                    label="Biography"
                    name="bio"
                  />

                  <Button
                    variantColor="blue"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={8}
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          <Flex mt="6" justify="center" align="center">
            <NextLink href="/change-password">
              <Link>Change Password</Link>
            </NextLink>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Account;
