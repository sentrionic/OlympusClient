import React from 'react';
import { Box, Flex, Text, useColorMode } from '@chakra-ui/core';

type FooterLinkProps = {
  icon?: string;
  href?: string;
  label?: string;
};

export const Footer: React.FC<FooterLinkProps> = ({}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      bottom={0}
      boxShadow='md'
      mt={12}
      justify='center'
      align='center'
      bg={isDark ? 'gray.800' : 'white'}
      borderTopWidth='1px'
      p={5}
      as='footer'
    >
      <Box textAlign='center'>
        <Text fontSize='xl'>
          <span>OlympusBlog</span>
        </Text>
      </Box>
    </Flex>
  );
};
