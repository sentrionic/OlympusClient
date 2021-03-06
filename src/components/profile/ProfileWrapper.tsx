import React from 'react';
import { Box } from '@chakra-ui/react';

interface ProfileWrapperProps {}

export const ProfileWrapper: React.FC<ProfileWrapperProps> = ({ children }) => {
  return (
    <Box mx="6" p={4}>
      {children}
    </Box>
  );
};
