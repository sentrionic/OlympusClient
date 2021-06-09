import React, { InputHTMLAttributes, useState } from 'react';
import { useField } from 'formik';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const PasswordField: React.FC<PasswordFieldProps> = ({ label, ...props }) => {
  const [field, { error, touched }] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <FormControl mt={4} isInvalid={error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <Input type={showPassword ? 'text' : 'password'} placeholder="*******" {...field} {...props} size="lg" />
        <InputRightElement width="3rem">
          <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility} tabIndex={-1}>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
