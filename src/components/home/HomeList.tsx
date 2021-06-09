import { Box, Button, Flex, Heading, Stack, Tag, Text } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { ArticlePreview } from '../article/ArticlePreview';
import { IndexProps } from '../../pages';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface HomeListProps {
  data: IndexProps;
}

export const HomeList: React.FC<HomeListProps> = ({ data }) => {
  const { page, hasMore, articles } = data;

  if (articles?.length === 0) {
    return (
      <Flex height="80vh">
        <Box shadow="md" borderWidth="1px" mb="auto" p="10">
          <Heading>No articles here.</Heading>
          {page === 0 ? <Text>Be the first to publish one</Text> : <Text>Try another page</Text>}
        </Box>
      </Flex>
    );
  }

  return (
    <>
      <Stack spacing={8}>
        {articles?.map((a) =>
          !a ? null : (
            <Flex key={a.id}>
              <ArticlePreview article={a} />
            </Flex>
          )
        )}
      </Stack>

      <Flex mt="4" justify="space-around">
        <NextLink
          href={{
            pathname: '/',
            query: page === 2 ? null : { p: page - 1 },
          }}
        >
          <Button variant="outline" aria-label="Favorite Article" leftIcon={<ChevronLeftIcon />} isDisabled={page <= 1}>
            <Text>Previous</Text>
          </Button>
        </NextLink>
        <Tag mx="auto">{page}</Tag>
        <NextLink href={{ pathname: '/', query: { p: page + 1 } }}>
          <Button
            variant="outline"
            aria-label="Favorite Article"
            rightIcon={<ChevronRightIcon />}
            isDisabled={!hasMore}
          >
            <Text>Next</Text>
          </Button>
        </NextLink>
      </Flex>
    </>
  );
};
