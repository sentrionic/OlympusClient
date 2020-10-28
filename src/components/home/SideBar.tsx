import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { PopularTags } from './PopularTabs';
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
            <NextLink href='/create'>
              <Button variant='outline' variantColor='blue' w='full'>
                Create Article
              </Button>
            </NextLink>
          ) : (
            <Box>
              <NextLink href='/register'>
                <Button variant='outline' variantColor='blue' w='full'>
                  Register
                </Button>
              </NextLink>
              <NextLink href='/login'>
                <Button mt='2' variant='ghost' variantColor='blue' w='full'>
                  Login
                </Button>
              </NextLink>
            </Box>
          )}
        </Box>
      </Box>
      <PopularTags />
    </Box>
  );
};
