import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/core';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const TextInput = textarea ? Textarea : Input;
  return (
    <FormControl mt={6} isInvalid={error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <TextInput {...field} {...props} size="lg" />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
