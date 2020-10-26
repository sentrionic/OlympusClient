import {
  Badge,
  Box,
  Flex,
  Heading,
  PseudoBox,
  SimpleGrid,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import useSWR from 'swr';

type PopularTagsProps = {};

export const PopularTags: React.FC<PopularTagsProps> = ({}) => {
  const { data } = useSWR<string[]>('/articles/tags');

  return (
    <Box shadow='md' borderWidth='1px' p='5' mt='5'>
      <Flex justify='center' mt={2}>
        <Heading size='lg'>Popular Tags</Heading>
      </Flex>
      <SimpleGrid mt={2} columns={2} spacing={3}>
        {data?.map((t) => (
          <NextLink key={t} href={{ pathname: '/search', query: { tag: [t] } }}>
            <PseudoBox key={t} w='auto' _hover={{ cursor: 'pointer' }}>
              <Badge w='full' p='2' rounded='md' textAlign='center'>
                {t}
              </Badge>
            </PseudoBox>
          </NextLink>
        ))}
      </SimpleGrid>
    </Box>
  );
};
