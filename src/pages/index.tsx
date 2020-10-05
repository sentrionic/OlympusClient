import React from 'react';
import { Layout } from '../components/Layout';
import { GetServerSideProps } from 'next';
import { BASE_URL } from '../utils/constants';
import useSWR from 'swr';
import NextLink from 'next/link';
import { getAllArticles } from '../api';
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Avatar,
  IconButton,
} from '@chakra-ui/core';
import { ArticleResponse } from '../api/models';
import { getTime } from '../utils/getTime';

interface IndexProps {
  articles: ArticleResponse[];
  articleCount: number;
}

const Index = (indexProps: IndexProps) => {
  const { data, error } = useSWR(`${BASE_URL}/articles`, {
    dedupingInterval: 60000,
    initialData: indexProps,
  });

  if (!error && !data) return null;

  return (
    <Layout>
      <Stack spacing={8}>
        {data?.articles?.map((a) =>
          !a ? null : (
            <Flex key={a.id} p={5} shadow="md" borderWidth="1px" m="auto">
              <Box flex={1}>
                <Stack isInline mb="5">
                  <Avatar name={a.author.username} src={a.author.image} />
                  <Box>
                    <Text fontWeight="bold" color="blue.600">
                      {a.author.username}
                    </Text>
                    <Text>{getTime(a.createdAt)}</Text>
                  </Box>
                </Stack>
                <Image
                  maxW="lg"
                  borderWidth="1px"
                  rounded="lg"
                  overflow="hidden"
                  src={a.image}
                  alt={a.title}
                  objectFit="contain"
                />
                <NextLink
                  href="/[username]/[slug]"
                  as={`/${a.author.username}/${a.slug}`}
                >
                  <Link>
                    <Heading fontSize="xl" pt="6">
                      {a.title}
                    </Heading>
                  </Link>
                </NextLink>
                <Text>{a.description}</Text>
                <Flex align="center">
                  <NextLink
                    href="/[username]/[slug]"
                    as={`/${a.author.username}/${a.slug}`}
                  >
                    <Link>
                      <Text fontSize="s" pt="6">
                        Read more...
                      </Text>
                    </Link>
                  </NextLink>
                </Flex>
                <Flex pt="4" justify="space-between">
                  <Flex>
                    <IconButton
                      variant="outline"
                      aria-label="Favorite Article"
                      icon="star"
                      size="sm"
                    />
                    <Text pl="2" fontSize="sm">
                      {a.favoritesCount}
                    </Text>
                  </Flex>
                  <IconButton
                    variant="outline"
                    aria-label="Favorite Article"
                    icon="chat"
                    size="sm"
                  />
                </Flex>
              </Box>
            </Flex>
          )
        )}
      </Stack>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await getAllArticles();
  const { articles, articlesCount } = data;
  return { props: { articles, articlesCount } };
};
