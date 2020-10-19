import React from 'react';
import NextLink from 'next/link';
import { Box, Flex, Heading, Link } from '@chakra-ui/core';

import { Layout } from '../layout/Layout';

export const NoArticleFound: React.FC<{}> = () => (
  <Layout>
    <Flex height='80vh'>
      <Box shadow='md' borderWidth='1px' m='auto' p='10'>
        <Heading>No Article Found</Heading>
        <NextLink href='/'>
          <Link>
            Go back <a>Home</a>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  </Layout>
);
