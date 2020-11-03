import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfoBox } from './InfiniteScrollInfoBox';
import { PaginatedArticles } from '../../api/models';
import { ArticlePreview } from '../article/ArticlePreview';

interface ArticleListProps {
  data: PaginatedArticles;
  mutate: Function;
  dataLoader: Function;
  noArticlesText: string;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  data,
  mutate,
  dataLoader,
  noArticlesText,
}) => {
  const fetchMore = async () => {
    const cursor = data.articles[data.articles.length - 1].createdAt;
    const { data: newArticles } = await dataLoader(cursor);
    mutate(
      {
        articles: [...data.articles, ...newArticles.articles],
        hasMore: newArticles.hasMore,
      },
      false
    );
  };

  if (data.articles?.length === 0) {
    return (
      <Flex height='80vh'>
        <Box shadow='md' borderWidth='1px' mb='auto' p='10' mx='auto'>
          <Heading>No articles here yet.</Heading>
          <Text>{noArticlesText}</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <InfiniteScroll
      dataLength={data.articles.length}
      next={fetchMore}
      hasMore={data.hasMore}
      loader={<InfoBox text={'Loading...'} />}
      endMessage={<InfoBox text={'No More Articles'} />}
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
  );
};
