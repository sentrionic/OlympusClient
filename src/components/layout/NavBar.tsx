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
import Headroom from 'react-headroom';
import { AiOutlineMenu } from 'react-icons/ai';
import { cache } from 'swr';
import { Logo } from './Logo';
import { logout } from '../../api';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { NavBarSearch } from './NavBarSearch';

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
          >
            <Avatar src={user.image} display={['none', 'none', 'flex']} />
            <Button
              as={Box}
              variantColor='blue'
              variant='outline'
              size='sm'
              display={['flex', 'flex', 'none']}
              color='blue'
              leftIcon='settings'
            >
              Account
            </Button>
          </PseudoBox>
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
    <Headroom>
      <Flex
        zIndex={4}
        top={0}
        p={4}
        minW={430}
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
            <Flex ml={[0, 0, 4]}>
              <Link style={{ textDecoration: 'none' }} href='/'>
                <Box w='40px' h='40px'>
                  <Logo isDark={isDark} />
                </Box>
                <Heading
                  as='h1'
                  letterSpacing={'-.1rem'}
                  ml={4}
                  display={[undefined, undefined, 'none']}
                >
                  OlympusBlog
                </Heading>
              </Link>
            </Flex>
          </Flex>
          <Box
            as={AiOutlineMenu}
            display={['block', 'block', 'none']}
            onClick={handleToggle}
          ></Box>
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
            mr='2'
            ml='4'
            onClick={toggleColorMode}
            icon={isDark ? 'sun' : 'moon'}
          />
        </Box>
      </Flex>
    </Headroom>
  );
};
