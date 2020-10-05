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
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      bottom={0}
      boxShadow="md"
      mt={5}
      justify="center"
      align="center"
      bg={isDark ? 'gray.800' : 'white'}
      borderWidth="1px"
      p={5}
    >
      <Box as="footer" textAlign="center">
        <Text fontSize="xl">
          <span>OlympusBlog</span>
        </Text>
      </Box>
    </Flex>
  );
};
