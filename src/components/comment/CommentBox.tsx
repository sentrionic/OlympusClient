import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import { createComment } from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { CommentSchema } from '../../utils/schemas/article.schema';
import { toErrorMap } from '../../utils/toErrorMap';

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
    <Box>
      <Formik
        initialValues={{
          body: '',
        }}
        validationSchema={CommentSchema}
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
              setErrors(toErrorMap(errors));
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
              colorScheme='blue'
              variant='outline'
              mt={4}
              size='sm'
              isLoading={isSubmitting}
              isDisabled={!user}
              onClick={() => handleSubmit}
            >
              Post Comment
            </Button>
          </>
        )}
      </Formik>
    </Box>
  );
};
