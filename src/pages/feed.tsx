import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR, { mutate, useSWRInfinite } from 'swr';
import { getAllArticles, setCookie } from '../api';
import { ArticleResponse } from '../api/models';
import { ArticlePreview } from '../components/article/ArticlePreview';
import { Layout } from '../components/layout/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const getKey = (pageIndex, previousPageData) => {
  // reached the end
  if (previousPageData && !previousPageData.data) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return '/articles/feed';
  // add the cursor to the API endpoint
  console.log(previousPageData);
  return `/articles/feed?cursor=${previousPageData.nextCursor}&limit=10`;
};

const Feed = () => {
  useIsAuth();
  const { data, error } = useSWRInfinite(getKey);

  if (!error && !data) return null;

  console.log(data);

  return <Layout></Layout>;
};

export default Feed;
