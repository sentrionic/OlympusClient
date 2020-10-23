import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { PopularTags } from './PopularTabs';

type SideBarProps = {};

export const SideBar: React.FC<SideBarProps> = ({}) => {
  const { user } = useGetCurrentUser();

  return (
    <Box
      w="25%"
      mr="auto"
      mt={100}
      ml="10"
      h="50%"
      display={['none', 'none', 'block', 'block']}
    >
      <Box shadow="md" borderWidth="1px" p="5">
        <Image rounded="md" src="https://bit.ly/2Z4KKcF" />
        <Flex justify="center" mt={2}>
          <Heading size="lg">OlympusBlog</Heading>
        </Flex>
        <Text mt={2} fontSize="md" fontWeight="semibold" lineHeight="short">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome
        </Text>
        <Box mt={2}>
          {user ? (
            <Button variant="outline" variantColor="blue" w="full">
              Create Article
            </Button>
          ) : (
            <Box>
              <NextLink href="/register">
                <Button variant="outline" variantColor="blue" w="full">
                  Register
                </Button>
              </NextLink>
              <NextLink href="/login">
                <Button mt="2" variant="ghost" variantColor="blue" w="full">
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
