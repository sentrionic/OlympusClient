import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  PseudoBox,
  useColorMode,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { cache } from 'swr';
import { NavBarSearch } from './NavBarSearch';
import { logout } from '../../api';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user, isLoading } = useGetCurrentUser();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  let body = null;

  if (isLoading) {
  } else if (user) {
    body = (
      <>
        <NextLink href={'/create'}>
          <Button
            variantColor='blue'
            variant='outline'
            mr={10}
            size='sm'
            leftIcon='edit'
            color='blue'
          >
            Create Article
          </Button>
        </NextLink>
        <Menu>
          <PseudoBox
            as={MenuButton}
            _hover={{ cursor: 'pointer' }}
            _focus={{ boxShadow: 'none' }}
            display={['none', 'none', 'flex']}
          >
            <Avatar src={user.image} display={['none', 'none', 'flex']} />
          </PseudoBox>
          <Button
            as={MenuButton}
            variantColor='blue'
            variant='outline'
            size='sm'
            display={['flex', 'flex', 'none']}
            color='blue'
            leftIcon='settings'
          >
            Account
          </Button>
          <MenuList>
            <NextLink href='/[username]' as={`/${user.username}`}>
              <MenuItem>Your Profile</MenuItem>
            </NextLink>
            <NextLink href='/account'>
              <MenuItem>Account</MenuItem>
            </NextLink>
            <MenuDivider />
            <MenuItem
              onClick={async () => {
                await logout();
                cache.clear();
                if (router.pathname === '/') {
                  router.reload();
                }
                await router.push('/');
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else {
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
      </>
    );
  }

  return (
    <Flex
      zIndex={4}
      position={['relative', 'relative', 'sticky']}
      top={0}
      p={4}
      boxShadow='md'
      justify='space-between'
      align='center'
      wrap='wrap'
      bg={isDark ? 'gray.800' : 'white'}
    >
      <Flex
        align='center'
        mr={['0', '0', '5']}
        width={['100%', '100%', 'auto']}
        justifyContent={['space-between', 'space-between', 'flex-start']}
      >
        <Flex justify={['center', 'center', 'flex-start']} w='full'>
          <NextLink href='/'>
            <Link>
              <Heading as='h1' letterSpacing={'-.1rem'}>
                OlympusBlog
              </Heading>
            </Link>
          </NextLink>
        </Flex>
        <Box display={['block', 'block', 'none']} onClick={handleToggle}>
          <svg
            fill='black'
            width='12px'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </Box>
      </Flex>
      <NavBarSearch show={show} />
      <Box
        mt={[4, 4, 0]}
        display={[show ? 'flex' : 'none', show ? 'flex' : 'none', 'flex']}
        alignItems='center'
        justifyContent={['center', 'center', 'flex-end']}
        flexGrow={[1, 1, 0]}
      >
        {body}
        <IconButton
          size='md'
          fontSize='lg'
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          variant='ghost'
          color='current'
          mx='2'
          onClick={toggleColorMode}
          icon={isDark ? 'sun' : 'moon'}
        />
      </Box>
    </Flex>
  );
};
