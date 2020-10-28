import {
  Badge,
  Box,
  Flex,
  Heading,
  PseudoBox,
  SimpleGrid,
  useColorMode,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import useSWR from 'swr';

type PopularTagsProps = {};

export const PopularTags: React.FC<PopularTagsProps> = ({}) => {
  const { data } = useSWR<string[]>('/articles/tags');
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      justify='center'
      align='center'
      direction='column'
      shadow='md'
      borderWidth='1px'
      p='5'
      mt='5'
    >
      <Heading size='lg' my={2}>
        Popular Tags
      </Heading>

      <SimpleGrid mt={3} columns={2} spacing={3}>
        {data?.map((t) => (
          <NextLink key={t} href={{ pathname: '/search', query: { tag: [t] } }}>
            <PseudoBox
              as={Badge}
              key={t}
              w='full'
              p='2'
              rounded='md'
              textAlign='center'
              _hover={{
                cursor: 'pointer',
                bg: isDark ? 'gray.500' : 'gray.300',
              }}
            >
              {t}
            </PseudoBox>
          </NextLink>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
