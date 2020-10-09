import React from 'react';
import { Layout } from '../components/Layout';
import { GetServerSideProps, NextPageContext } from 'next';
import useSWR, { mutate } from 'swr';
import NextLink from 'next/link';
import {
  favoriteArticle,
  getAllArticles,
  getArticleBySlug,
  setCookie,
  unfavoriteArticle,
} from '../api';
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
  const { data, error } = useSWR('/articles', {
    dedupingInterval: 60000,
    initialData: indexProps,
  });

  if (!error && !data) return null;

  const handleFavorite = ({ slug, favorited }: ArticleResponse) => {
    mutate('/articles', async (articles: IndexProps) => {
      const article = await getArticleBySlug(slug);
      article.favorited = !article.favorited;
      article.favoritesCount += favorited ? -1 : 1;
      return {
        articles: data.articles,
        articleCount: data.articleCount,
      };
    });
    if (favorited) {
      unfavoriteArticle(slug);
    } else {
      favoriteArticle(slug);
    }
  };

  return (
    <Layout>
      { data?.articles?.length === 0 ?     
      <Flex height="80vh">
        <Box shadow="md" borderWidth="1px" m="auto" p="10">
          <Heading>No articles here yet.</Heading>
          <Text>Be the first one</Text>
        </Box>
      </Flex>
      :
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
                      variantColor={a.favorited ? 'yellow' : undefined}
                      onClick={() => handleFavorite(a)}
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
      }
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  setCookie(ctx?.req?.headers?.cookie);

  const { data } = await getAllArticles();
  const { articles, articlesCount } = data;
  return { props: { articles, articlesCount } };
};
