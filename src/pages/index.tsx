import {
  Box,
  Flex,
  Heading,
  Stack,
  TabPanel,
  TabPanels,
  Text,
} from '@chakra-ui/core';
import { GetServerSideProps } from 'next';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { getAllArticles, setCookie } from '../api';
import { ArticleResponse } from '../api/models';
import { ArticlePreview } from '../components/article/ArticlePreview';
import { HomeTabs } from '../components/home/HomeTabs';
import { LoadingSpinner } from '../components/home/LoadingSpinner';
import { SideBar } from '../components/home/SideBar';
import { Footer } from '../components/layout/Footer';
import { NavBar } from '../components/layout/NavBar';

interface IndexProps {
  articles: ArticleResponse[];
  hasMore: boolean;
}

const Index = (indexProps: IndexProps) => {
  const { data, error, mutate } = useSWR('/articles', {
    dedupingInterval: 60000,
    initialData: indexProps,
  });

  if (!error && !data) return null;

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
    <>
      <NavBar />
      <Flex>
        <Box
          mt={8}
          maxW="600px"
          w="auto"
          ml="auto"
          mr={['auto', 'auto', '0', '0']}
        >
          <HomeTabs>
            <TabPanels>
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
              <TabPanel>
                <LoadingSpinner />
              </TabPanel>
            </TabPanels>
          </HomeTabs>
        </Box>
        <SideBar />
      </Flex>
      <Footer />
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  setCookie(ctx?.req?.headers?.cookie);

  const { data } = await getAllArticles();
  const { articles, hasMore } = data;
  return { props: { articles, hasMore } };
};
