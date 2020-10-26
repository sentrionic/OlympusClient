import { Box, Flex, TabPanel, TabPanels } from '@chakra-ui/core';
import { GetServerSideProps } from 'next';
import React from 'react';
import useSWR from 'swr';
import { getAllArticles, setCookie } from '../api';
import { ArticleResponse } from '../api/models';
import { HomeList } from '../components/home/HomeList';
import { HomeTabs } from '../components/home/HomeTabs';
import { LoadingSpinner } from '../components/home/LoadingSpinner';
import { SideBar } from '../components/home/SideBar';
import { Footer } from '../components/layout/Footer';
import { NavBar } from '../components/layout/NavBar';

export interface IndexProps {
  articles: ArticleResponse[];
  hasMore: boolean;
  page: number;
}

const Index = (indexProps: IndexProps) => {
  const { page } = indexProps;

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
          maxW='600px'
          w='auto'
          ml='auto'
          mr={['auto', 'auto', '0', '0']}
        >
          <HomeTabs>
            <TabPanels>
              <TabPanel my='6'>
                <HomeList data={data} />
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
