import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  InputGroup,
  Switch,
  Textarea,
  Text,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { createArticle } from '../api';
import { InputField } from '../components/common/InputField';
import { Layout } from '../components/layout/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { ArticleSchema } from '../utils/schemas/article.schema';

const Create = () => {
  useIsAuth();
  const router = useRouter();
  const inputFile = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isPreview, togglePreview] = useState(false);

  return (
    <Layout variant="regular">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" minH="100vh">
        <Box textAlign="center">
          <Heading>Create Article</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Formik
            initialValues={{
              title: '',
              description: '',
              body: '',
              tagList: '',
              image: null,
            }}
            validationSchema={ArticleSchema}
            onSubmit={async (values, { setErrors }) => {
              try {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('body', values.body);
                formData.append('image', values.image);
                const tags = values.tagList.replace(' ', '').split(',');
                tags.map((tag, i) => formData.append(`tagList[${i}]`, tag));
                const { data } = await createArticle(formData);
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
            {({
              isSubmitting,
              setFieldValue,
              values,
              errors,
              touched,
              handleChange,
            }) => (
              <Form>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={inputFile}
                  hidden
                  onChange={async (e) => {
                    if (!e.currentTarget.files) return;
                    setFieldValue('image', e.currentTarget.files[0]);
                    setImageUrl(URL.createObjectURL(e.currentTarget.files[0]));
                  }}
                />
                {imageUrl && (
                  <Flex justify="center" mb="6">
                    <Image
                      maxW="lg"
                      borderWidth="1px"
                      rounded="lg"
                      overflow="hidden"
                      src={imageUrl}
                      alt={'Article Image'}
                      objectFit="contain"
                    />
                  </Flex>
                )}
                <Button
                  leftIcon="plus-square"
                  variantColor="blue"
                  variant="outline"
                  onClick={() => inputFile.current.click()}
                >
                  Choose Optional Splash Image
                </Button>
                <InputField placeholder="Title" label="Title" name="title" />
                <InputField
                  placeholder="What's this article about"
                  label="Description"
                  name="description"
                />
                <Box mt="6">
                  <FormControl mt={6} isInvalid={errors.body && touched.body}>
                    <Flex align="center" justify="space-between">
                      <FormLabel>Body</FormLabel>
                      <Flex align="center">
                        <Switch
                          id="preview"
                          onChange={() => togglePreview(!isPreview)}
                        />
                        <Text ml="2">Preview</Text>
                      </Flex>
                    </Flex>
                    <InputGroup>
                      {isPreview ? (
                        <ReactMarkdown
                          className="markdown-body"
                          renderers={ChakraUIRenderer()}
                          source={values.body}
                          escapeHtml={false}
                        />
                      ) : (
                        <Textarea
                          value={values.body}
                          placeholder="Write your article (in markdown)"
                          name="body"
                          resize="vertical"
                          onChange={handleChange}
                          h="40vh"
                        />
                      )}
                    </InputGroup>
                    <FormErrorMessage>{errors.body}</FormErrorMessage>
                  </FormControl>
                </Box>
                <InputField
                  placeholder="A list of tags, seperated by commas"
                  label="Tags"
                  name="tagList"
                />
                <Flex justify="flex-end">
                  <Button
                    variantColor="blue"
                    variant="outline"
                    type="submit"
                    mt={4}
                    isLoading={isSubmitting}
                  >
                    Publish Article
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
};

export default Create;
