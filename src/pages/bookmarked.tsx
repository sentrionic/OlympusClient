import { TabPanel, TabPanels } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import React from 'react';
import useSWR from 'swr';
import { getBookmarked } from '../api';
import { PaginatedArticles } from '../api/models';
import { ArticleList } from '../components/home/ArticleList';
import { HomeTabs } from '../components/home/HomeTabs';
import { LoadingSpinner } from '../components/home/LoadingSpinner';
import { Layout } from '../components/layout/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const Bookmarked = () => {
  useIsAuth();
  const { data, mutate } = useSWR<PaginatedArticles>('/articles/bookmarked');

  if (!data) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <NextSeo title="Bookmarked" />
      <HomeTabs tabIndex={2}>
        <TabPanels>
          <TabPanel>
            <LoadingSpinner />
          </TabPanel>
          <TabPanel>
            <LoadingSpinner />
          </TabPanel>
          <TabPanel my="6">
            <ArticleList
              data={data}
              mutate={mutate}
              dataLoader={getBookmarked}
              noArticlesText={'Articles will appear here once you bookmark them'}
            />
          </TabPanel>
        </TabPanels>
      </HomeTabs>
    </Layout>
  );
};

export default Bookmarked;
