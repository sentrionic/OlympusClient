import React from 'react';
import useSWR from 'swr';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  TabPanel,
  TabPanels,
  Text,
} from '@chakra-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getAllArticles } from '../api';
import { ArticlePreview } from '../components/article/ArticlePreview';
import { Layout } from '../components/layout/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { HomeTabs } from '../components/home/HomeTabs';
import { LoadingSpinner } from '../components/home/LoadingSpinner';
import { PaginatedArticles } from '../api/models';

const Feed = () => {
  useIsAuth();
  const { data, error, mutate } = useSWR<PaginatedArticles>('/articles/feed', {
    dedupingInterval: 60000,
  });

  if (!data) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  const fetchMore = async () => {
    const cursor = data.articles[data.articles.length - 1].createdAt;
    const { data: newArticles } = await getAllArticles(cursor);
    mutate(
      {
        articles: [...data.articles, ...newArticles.articles],
        hasMore: newArticles.hasMore,
      },
      false
    );
  };

  return (
    <Layout>
      <HomeTabs tabIndex={1}>
        <TabPanels>
          <TabPanel>
            <LoadingSpinner />
          </TabPanel>
          <TabPanel my="6">
            {data.articles?.length === 0 ? (
              <Flex height="80vh">
                <Box shadow="md" borderWidth="1px" m="auto" p="10">
                  <Heading>No articles here yet.</Heading>
                  <Text>Be the first one</Text>
                </Box>
              </Flex>
            ) : (
              <InfiniteScroll
                dataLength={data.articles.length}
                next={fetchMore}
                hasMore={data.hasMore}
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
                  {data.articles?.map((a) =>
                    !a ? null : (
                      <Flex key={a.id}>
                        <ArticlePreview article={a} />
                      </Flex>
                    )
                  )}
                </Stack>
              </InfiniteScroll>
            )}
          </TabPanel>
        </TabPanels>
      </HomeTabs>
    </Layout>
  );
};

export default Feed;
