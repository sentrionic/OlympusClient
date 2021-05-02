import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

interface NoResultProps {
  search: string;
}

export const NoResults: React.FC<NoResultProps> = ({ search }) => (
  <Flex>
    <Box shadow='md' borderWidth='1px' m='auto' p='10'>
      <Heading>No Articles Found</Heading>
      <Text>
        There were not results for the search term
        <Text fontWeight='semibold'>{search}</Text>
      </Text>
    </Box>
  </Flex>
);
