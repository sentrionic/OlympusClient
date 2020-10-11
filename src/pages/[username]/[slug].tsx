import React from 'react';
import { Layout } from '../../components/Layout';
import {
  Heading,
  Box,
  Flex,
  Link,
  Stack,
  Avatar,
  Text,
  Image,
  Button,
  Badge,
  PseudoBox,
  IconButton,
  Divider,
} from '@chakra-ui/core';
import { GetServerSideProps } from 'next';
import { getArticleBySlug, setCookie } from '../../api';
import { ArticleResponse } from '../../api/models';
import useSWR from 'swr';
import NextLink from 'next/link';
import { getTime } from '../../utils/getTime';

interface ArticleProps {
  article: ArticleResponse;
}

const NoArticleFound = () => (
  <Layout>
    <Flex height="80vh">
      <Box shadow="md" borderWidth="1px" m="auto" p="10">
        <Heading>No Article Found</Heading>
        <NextLink href="/">
          <Link>
            Go back <a>Home</a>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  </Layout>
);

const Article = ({ article }: ArticleProps) => {
  if (!article) {
    return <NoArticleFound />;
  }

  const { data, error } = useSWR(`/articles/${article.slug}`, {
    initialData: article,
  });

  if (!data || error) {
    return null;
  }

  return (
    <Layout>
      <Flex direction="column" justify="center">
        <Heading>{data.title}</Heading>
        <Stack isInline my="5">
          <Avatar name={data.author.username} src={data.author.image} />
          <Box>
            <Flex>
              <NextLink href={`${data.author.username}`}>
                <Link fontWeight="semibold">{data.author.username}</Link>
              </NextLink>
              <Button
                variant="outline"
                size="xs"
                rounded="true"
                ml="3"
                onClick={() => {}}
              >
                {data.author.following ? 'Unfollow' : 'Follow'}
              </Button>
            </Flex>
            <Text>{getTime(data.createdAt)}</Text>
          </Box>
        </Stack>
        <Text fontWeight="semibold" fontSize="18px" mb="5">
          {data.description}
        </Text>
        <Flex align="center" justify="center">
          <Image
            maxW="lg"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            src={data.image}
            alt={data.title}
            objectFit="contain"
          />
        </Flex>
        <Text fontSize="18px" mt="10">
          {data.body}
        </Text>
        <Flex mt="5">
          {data.tagList.map((t) => (
            <PseudoBox _hover={{ cursor: 'pointer' }} mr="4">
              <Badge key={t} p="2" rounded="md">
                {t}
              </Badge>
            </PseudoBox>
          ))}
        </Flex>
        <Flex mt="10">
          <Flex>
            <IconButton
              variant="outline"
              aria-label="Favorite Article"
              icon="star"
              size="sm"
              variantColor={data.favorited ? 'yellow' : undefined}
              onClick={() => {}}
            />
            <Text pl="2" fontSize="sm">
              {data.favoritesCount}
            </Text>
            <IconButton
              variant="outline"
              aria-label="Favorite Article"
              icon="chat"
              size="sm"
              ml="4"
            />
          </Flex>
        </Flex>
        <Divider my="5" />
        <Stack isInline>
          <Avatar
            name={data.author.username}
            src={data.author.image}
            size="lg"
          />
          <Box>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color="gray.500"
            >
              Written by
            </Text>
            <Flex justify="space-between">
              <NextLink href={`${data.author.username}`}>
                <Link>
                  <Heading as="h3" size="lg">
                    {data.author.username}
                  </Heading>
                </Link>
              </NextLink>
              <Button
                variant="outline"
                size="xs"
                rounded="true"
                ml="3"
                onClick={() => {}}
              >
                {data.author.following ? 'Unfollow' : 'Follow'}
              </Button>
            </Flex>
            <Text mt="4" color="gray.700">
              {data.author.bio}
            </Text>
          </Box>
        </Stack>
        <Divider my="5" />
      </Flex>
    </Layout>
  );
};

export default Article;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  setCookie(ctx?.req?.headers?.cookie);
  const slug = ctx?.query.slug as string;

  try {
    const { data: article } = await getArticleBySlug(slug);
    return { props: { article } };
  } catch (err) {
    return { props: { article: null } };
  }
};
