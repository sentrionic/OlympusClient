import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { createComment } from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

interface CommentBoxProps {
  article: ArticleResponse;
  addComment: Function;
}

export const CommentBox: React.FC<CommentBoxProps> = ({
  article,
  addComment,
}) => {
  const { user } = useGetCurrentUser();
  return (
    <Flex align='flex-end'>
      <Formik
        initialValues={{
          body: '',
        }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          try {
            const { data: newComment } = await createComment(
              article.slug,
              values
            );

            if (newComment) {
              addComment(newComment);
              resetForm();
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
          handleChange,
          errors,
          touched,
          values,
          handleSubmit,
        }) => (
          <>
            <FormControl isInvalid={errors.body && touched.body} w='full'>
              <Textarea
                value={values.body}
                name='body'
                onChange={handleChange}
                placeholder={`What are your thoughts?${
                  !user ? '\nSign in to comment.' : ''
                }`}
              />
              <FormErrorMessage>{errors.body}</FormErrorMessage>
            </FormControl>

            <Button
              variantColor='blue'
              variant='outline'
              ml={4}
              size='sm'
              color='blue'
              isLoading={isSubmitting}
              isDisabled={!user}
              onClick={handleSubmit}
            >
              Post Comment
            </Button>
          </>
        )}
      </Formik>
    </Flex>
  );
};
