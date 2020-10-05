import {
  Box,
  Stack,
  Text,
  Link,
  Icon,
  Flex,
  useColorMode,
  Divider,
} from '@chakra-ui/core';
import React from 'react';

type FooterLinkProps = {
  icon?: string;
  href?: string;
  label?: string;
};

export const Footer: React.FC<FooterLinkProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      bottom={0}
      p={4}
      boxShadow='md'
      justify='center'
      align='center'
      bg={isDark ? 'gray.800' : 'white'}
    >
      <Divider />
      <Box as='footer' mt={12} textAlign='center'>
        <Text fontSize='sm'>
          <span>OlympusBlog</span>
        </Text>
      </Box>
    </Flex>
  );
};
