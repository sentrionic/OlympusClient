import React from 'react';
import {
  Box,
  Link,
  Flex,
  Button,
  Heading,
  IconButton,
  useColorMode,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  let body = null;

  // data is loading
  body = (
    <>
      <NextLink href='/login'>
        <Button variantColor='blue' variant='outline' mr={2} size='sm'>
          Login
        </Button>
      </NextLink>
      <NextLink href='/register'>
        <Button variantColor='blue' variant='solid' mr={2} size='sm'>
          Register
        </Button>
      </NextLink>
      <IconButton
        size='md'
        fontSize='lg'
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        variant='ghost'
        color='current'
        mr='2'
        onClick={toggleColorMode}
        icon={isDark ? 'sun' : 'moon'}
      />
    </>
  );

  return (
    <Flex
      zIndex={1}
      position='sticky'
      top={0}
      p={4}
      boxShadow='md'
      justify='space-between'
      align='center'
      bg={isDark ? 'gray.800' : 'white'}
    >
      <Box ml='4'>
        <NextLink href='/'>
          <Link>
            <Heading>OlympusBlog</Heading>
          </Link>
        </NextLink>
      </Box>
      <Box>{body}</Box>
    </Flex>
  );
};
