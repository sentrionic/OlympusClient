import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

interface NoProfilesProps {
  search: string;
}

export const NoProfiles: React.FC<NoProfilesProps> = ({ search }) => (
  <Flex>
    <Box shadow='md' borderWidth='1px' m='auto' p='10'>
      <Heading>No Profiles Found</Heading>
      <Text>
        There were not results for the search term
        <Text fontWeight='semibold'>{search}</Text>
      </Text>
    </Box>
  </Flex>
);
