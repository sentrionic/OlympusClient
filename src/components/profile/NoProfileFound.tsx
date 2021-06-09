import React from 'react';
import NextLink from 'next/link';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';

import { Layout } from '../layout/Layout';

export const NoProfileFound: React.FC<{}> = () => {
  return (
    <Layout>
      <Flex height="80vh">
        <Box shadow="md" borderWidth="1px" m="auto" p="10">
          <Heading>No Profile Found</Heading>
          <NextLink href="/">
            <Link>Go back Home</Link>
          </NextLink>
        </Box>
      </Flex>
    </Layout>
  );
};
