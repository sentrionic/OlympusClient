import React from 'react';
import {
  Box,
  Link,
  Flex,
  Button,
  Heading,
  IconButton,
  useColorMode,
  Avatar,
  PseudoBox,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { useGetCurrentUser } from '../api/useGetCurrentUser';
import { logout } from '../api';
import { useRouter } from 'next/router';
import { cache } from 'swr';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user, isLoading } = useGetCurrentUser();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  let body = null;

  if (isLoading) {
  } else if (user) {
    body = (
      <>
        <Menu>
          <PseudoBox as={MenuButton}  _hover={{ cursor: "pointer" }} _focus={{ boxShadow: "none" }}>
              <Avatar src={user.image} />
            </PseudoBox>
          <MenuList>
            <NextLink href={`/${user.username}`}>
              <MenuItem>Your Profile</MenuItem>
            </NextLink>
            <NextLink href="/account">
              <MenuItem>Account</MenuItem>
            </NextLink>
          <MenuDivider />
          <MenuItem onClick={async () => {
            await logout();
            cache.clear();
            if (router.pathname === '/') {
              router.reload();
            }
            await router.push('/');
          }}>
            Logout</MenuItem>
          </MenuList>
          </Menu>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="/login">
          <Button variantColor="blue" variant="outline" mr={2} size="sm">
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button variantColor="blue" variant="solid" mr={2} size="sm">
            Register
          </Button>
        </NextLink>
      </>
    );
  }

  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      p={4}
      boxShadow="md"
      justify="space-between"
      align="center"
      bg={isDark ? 'gray.800' : 'white'}
    >
      <Box ml="4">
        <NextLink href="/">
          <Link>
            <Heading>OlympusBlog</Heading>
          </Link>
        </NextLink>
      </Box>
      <Flex align="center">
        {body}{' '}
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          variant="ghost"
          color="current"
          mx="2"
          onClick={toggleColorMode}
          icon={isDark ? 'sun' : 'moon'}
        />
      </Flex>
    </Flex>
  );
};
