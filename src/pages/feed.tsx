import { TabPanel, TabPanels } from '@chakra-ui/core';
import React from 'react';
import useSWR from 'swr';
import { getFeed } from '../api';
import { PaginatedArticles } from '../api/models';
import { ArticleList } from '../components/home/ArticleList';
import { HomeTabs } from '../components/home/HomeTabs';
import { LoadingSpinner } from '../components/home/LoadingSpinner';
import { Layout } from '../components/layout/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const Feed = () => {
  useIsAuth();
  const { data, mutate } = useSWR<PaginatedArticles>('/articles/feed', {
    dedupingInterval: 60000,
  });

  if (!data) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <HomeTabs tabIndex={1}>
        <TabPanels>
          <TabPanel>
            <LoadingSpinner />
          </TabPanel>
          <TabPanel my='6'>
            <ArticleList data={data} mutate={mutate} dataLoader={getFeed} />
          </TabPanel>
        </TabPanels>
      </HomeTabs>
    </Layout>
  );
};

export default Feed;
