import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR, { mutate } from 'swr';
import { getAllArticles, setCookie } from '../api';
import { ArticleResponse } from '../api/models';
import { ArticlePreview } from '../components/article/ArticlePreview';
import { Layout } from '../components/layout/Layout';

interface IndexProps {
  articles: ArticleResponse[];
  hasMore: boolean;
}

const Index = (indexProps: IndexProps) => {
  const [articles, setArticles] = useState(indexProps.articles);
  const [hasMore, setHasMore] = useState(indexProps.hasMore);
  const { data, error } = useSWR('/articles', {
    dedupingInterval: 60000,
    initialData: indexProps,
  });

  if (!error && !data) return null;

  const fetchMore = async () => {
    const cursor = articles[articles.length - 1].createdAt;
    const { data: newArticles } = await getAllArticles(cursor);
    setArticles([...articles, ...newArticles.articles]);
    setHasMore(newArticles.hasMore);
    mutate('articles', { articles });
  };

  return (
    <Layout>
      {articles?.length === 0 ? (
        <Flex height="80vh">
          <Box shadow="md" borderWidth="1px" m="auto" p="10">
            <Heading>No articles here yet.</Heading>
            <Text>Be the first one</Text>
          </Box>
        </Flex>
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <Flex align="center" justify="center" mt="10">
              <Box shadow="md" borderWidth="1px" m="auto" p="4">
                <Text>No More Articles</Text>
              </Box>
            </Flex>
          }
        >
          <Stack spacing={8}>
            {articles?.map((a) =>
              !a ? null : (
                <Flex key={a.id}>
                  <ArticlePreview article={a} />
                </Flex>
              )
            )}
          </Stack>
        </InfiniteScroll>
      )}
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  setCookie(ctx?.req?.headers?.cookie);

  const { data } = await getAllArticles();
  const { articles, hasMore } = data;
  return { props: { articles, hasMore } };
};
