import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  PseudoBox,
  Stack,
  Text,
} from '@chakra-ui/core';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import useSWR, { mutate } from 'swr';
import {
  favoriteArticle,
  followUser,
  getArticleBySlug,
  setCookie,
  unfavoriteArticle,
  unfollowUser,
} from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { ArticleMenu } from '../../components/article/ArticleMenu';
import { NoArticleFound } from '../../components/article/NoArticleFound';
import { CommentSection } from '../../components/comment/CommentSection';
import { Layout } from '../../components/layout/Layout';
import { getTime } from '../../utils/getTime';

interface ArticleProps {
  article: ArticleResponse;
}

const Article = ({ article }: ArticleProps) => {
  if (!article) {
    return <NoArticleFound />;
  }

  const router = useRouter();
  const { user } = useGetCurrentUser();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { data, error } = useSWR(`/articles/${article.slug}`, {
    initialData: article,
  });

  if (!data || error) {
    return null;
  }

  const toggleFavorite = () => {
    if (!user) {
      return router.replace(
        '/login?next=' + router.query.username + '/' + router.query.slug
      );
    }

    const favorited = data.favorited;
    const favoritesCount = (data.favoritesCount += favorited ? -1 : 1);
    mutate(
      `/articles/${article.slug}`,
      {
        ...data,
        favorited: !favorited,
        favoritesCount,
      },
      false
    );

    if (favorited) {
      unfavoriteArticle(data.slug);
    } else {
      favoriteArticle(data.slug);
    }
  };

  const toggleFollow = () => {
    if (!user) {
      return router.replace(
        '/login?next=' + router.query.username + '/' + router.query.slug
      );
    }

    const isFollowing = article.author.following;

    mutate(
      `/articles/${article.slug}`,
      {
        ...article,
        author: { ...article.author, following: !isFollowing },
      },
      false
    );

    if (isFollowing) {
      unfollowUser(article.author.username);
    } else {
      followUser(article.author.username);
    }
  };

  return (
    <Layout>
      <Flex direction="column" justify="center">
        <Flex align="center">
          <Heading mr="10">{data.title}</Heading>
          {user?.id === article.author.id && <ArticleMenu article={data} />}
        </Flex>
        <Stack isInline my="5">
          <Avatar name={data.author.username} src={data.author.image} />
          <Box>
            <Flex>
              <NextLink href={'/[username]'} as={`/${data.author.username}`}>
                <Link fontWeight="semibold">{data.author.username}</Link>
              </NextLink>
              <Button
                variant="outline"
                size="xs"
                rounded="true"
                ml="3"
                onClick={() => toggleFollow()}
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
        <Box mt="10">
          <ReactMarkdown
            className="markdown-body"
            renderers={ChakraUIRenderer()}
            source={data.body}
            escapeHtml={false}
          />
        </Box>
        <Flex mt="5">
          {data.tagList.map((t) => (
            <NextLink
              key={t}
              href={{ pathname: '/search', query: { tag: [t] } }}
            >
              <PseudoBox key={t} _hover={{ cursor: 'pointer' }} mr="4">
                <Badge p="2" rounded="md">
                  {t}
                </Badge>
              </PseudoBox>
            </NextLink>
          ))}
        </Flex>
        <Flex mt="10">
          <Flex align="center">
            <IconButton
              variant="ghost"
              aria-label="Favorite Article"
              icon="star"
              size="md"
              variantColor={data.favorited ? 'yellow' : undefined}
              onClick={() => {
                toggleFavorite();
              }}
            />
            <Text pl="2" fontSize="sm">
              {data.favoritesCount}
            </Text>
            <Button
              variant="ghost"
              aria-label="Favorite Article"
              leftIcon="chat"
              size="md"
              ml="4"
              onClick={() => handleToggle()}
            >
              <Text pl="2" fontSize="sm">
                View Comments
              </Text>
            </Button>
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
            <NextLink href={'/[username]'} as={`/${data.author.username}`}>
              <Link>
                <Heading as="h3" size="lg">
                  {data.author.username}
                </Heading>
              </Link>
            </NextLink>
            <Text mt="2" color="gray.700">
              {data.author.bio}
            </Text>
          </Box>
        </Stack>
        <Divider my="5" />
        <Collapse mt={4} isOpen={show} id={'comments'}>
          <CommentSection article={data} isShown={show} />
        </Collapse>
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
