import { Text } from '@chakra-ui/core';
import React from 'react';

interface ProfileTabHeaderProps {
  isNotSelectedTab?: boolean;
}

export const ProfileTabHeader: React.FC<ProfileTabHeaderProps> = ({
  children,
  isNotSelectedTab = false,
}) => {
  return (
    <Text
      fontWeight="bold"
      fontSize="xl"
      my="6"
      height={isNotSelectedTab ? '80vh' : undefined}
    >
      {children}
    </Text>
  );
};
