import { TabPanel, TabPanels } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
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
  const { data, mutate } = useSWR<PaginatedArticles>('/articles/feed');

  if (!data) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <NextSeo title="Your Feed" />
      <HomeTabs tabIndex={1}>
        <TabPanels>
          <TabPanel>
            <LoadingSpinner />
          </TabPanel>
          <TabPanel my="6">
            <ArticleList
              data={data}
              mutate={mutate}
              dataLoader={getFeed}
              noArticlesText={'Articles will appear here once you follow more people'}
            />
          </TabPanel>
          <TabPanel>
            <LoadingSpinner />
          </TabPanel>
        </TabPanels>
      </HomeTabs>
    </Layout>
  );
};

export default Feed;
