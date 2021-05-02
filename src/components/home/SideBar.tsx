import { Box, Button, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { PopularTags } from './PopularTags';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

type SideBarProps = {};

export const SideBar: React.FC<SideBarProps> = ({}) => {
  const { user } = useGetCurrentUser();

  return (
    <Box
      w={['25%', '25%', '25%', '20%']}
      mr='auto'
      mt={100}
      ml='10'
      h='50%'
      maxW={'250px'}
      display={['none', 'none', 'block', 'block']}
    >
      <Box shadow='md' borderWidth='1px' p='5'>
        <Image rounded='md' src='/logo.png' />
        <Flex justify='center' mt={2}>
          <Heading size='lg'>OlympusBlog</Heading>
        </Flex>
        <Text mt={2} fontSize='md' fontWeight='semibold' lineHeight='short'>
          Read and share new perspectives on just about any topic. Everyone’s
          welcome
        </Text>
        <Box mt={2}>
          {user ? (
            <Link href='/create' style={{ textDecoration: 'none' }}>
              <Button variant='outline' colorScheme='blue' w='full'>
                Create Article
              </Button>
            </Link>
          ) : (
            <Box>
              <Link href='/register' style={{ textDecoration: 'none' }}>
                <Button variant='outline' colorScheme='blue' w='full'>
                  Register
                </Button>
              </Link>
              <Link href='/login' style={{ textDecoration: 'none' }}>
                <Button mt='2' variant='ghost' colorScheme='blue' w='full'>
                  Login
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
      <PopularTags />
    </Box>
  );
};
