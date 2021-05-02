import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PaginatedArticles, ProfileResponse } from '../../api/models';
import { ArticlePreview } from '../article/ArticlePreview';
import { InfoBox } from '../home/InfiniteScrollInfoBox';

interface ProfileArticleListProps {
  data: PaginatedArticles;
  profile: ProfileResponse;
  mutate: Function;
  dataLoader: Function;
  noDataText: string;
}

export const ProfileArticleList: React.FC<ProfileArticleListProps> = ({
  data,
  profile,
  mutate,
  dataLoader,
  noDataText,
}) => {
  const fetchMore = async () => {
    const cursor = data.articles[data.articles.length - 1].createdAt;
    const { data: newArticles } = await dataLoader(profile.username, cursor);
    mutate(
      {
        articles: [...data.articles, ...newArticles.articles],
        hasMore: newArticles.hasMore,
      },
      false
    );
  };

  if (data?.articles?.length === 0) {
    return (
      <Box height='80vh' m='auto'>
        <Text fontWeight='semibold'>{noDataText}</Text>
      </Box>
    );
  }

  return (
    <InfiniteScroll
      dataLength={data.articles.length}
      next={fetchMore}
      hasMore={data.hasMore}
      loader={<InfoBox text={'Loading...'} />}
      endMessage={<Box />}
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
