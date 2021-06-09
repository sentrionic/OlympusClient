import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

export const LoadingSpinner: React.FC<{}> = ({}) => {
  return (
    <Flex mt="20" justify="center" h="80vh">
      <Spinner thickness="4px" speed="0.65s" size="xl" />
    </Flex>
  );
};
