import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  TabPanel,
  TabPanels,
  Tag,
  Text,
} from '@chakra-ui/core';
import { GetServerSideProps } from 'next';
import React from 'react';
import useSWR from 'swr';
import NextLink from 'next/link';
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
  page: number;
}

const Index = (indexProps: IndexProps) => {
  const { page, hasMore } = indexProps;

  const { data, error } = useSWR(`/articles?p=${page}&limit=10`, {
    initialData: indexProps,
  });

  if (!error && !data) return null;

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
                <Stack spacing={8}>
                  {data.articles?.map((a) =>
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
                    <Button
                      variant="outline"
                      aria-label="Favorite Article"
                      leftIcon="chevron-left"
                      isDisabled={page <= 1}
                    >
                      <Text>Previous</Text>
                    </Button>
                  </NextLink>
                  <Tag mx="auto">{page}</Tag>
                  <NextLink href={{ pathname: '/', query: { p: page + 1 } }}>
                    <Button
                      variant="outline"
                      aria-label="Favorite Article"
                      rightIcon="chevron-right"
                      isDisabled={!hasMore}
                    >
                      <Text>Next</Text>
                    </Button>
                  </NextLink>
                </Flex>
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

  const page = Math.max(parseInt(ctx?.query?.p?.toString()), 1) || 1;

  const { data } = await getAllArticles(page);
  const { articles, hasMore } = data;
  return { props: { articles, hasMore, page } };
};
