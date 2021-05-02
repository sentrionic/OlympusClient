import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

export const InfoBox: React.FC<{ text: string }> = ({ text }) => (
  <Flex align='center' justify='center' mt='10'>
    <Box shadow='md' borderWidth='1px' m='auto' p='4'>
      <Text>{text}</Text>
    </Box>
  </Flex>
);
