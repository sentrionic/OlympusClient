import React from 'react';
import useSWR from 'swr';
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
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

const Search = () => {
  const { data, error, mutate } = useSWR('/articles/feed', {
    dedupingInterval: 60000,
  });

  if (!error && !data)
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );

  if (error) {
    return (
      <Layout>
        <Flex mt="20" justify="center" h="80vh">
          <Text>
            Something went wrong, please refresh the page or try again later
          </Text>
          <Text>Error: {error}</Text>
        </Flex>
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
      <Flex>
        <Input />
        <Select placeholder="By Content">
          <option value="tag">Tag</option>
          <option value="author">Author</option>
        </Select>
      </Flex>
    </Layout>
  );
};

export default Search;
