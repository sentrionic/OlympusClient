import { Avatar, Box, Button, Collapse, Divider, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { GetServerSideProps } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import useSWR from 'swr';
import { ChatIcon } from '@chakra-ui/icons';
import { NextSeo } from 'next-seo';
import { getArticleBySlug, setCookie } from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { ArticleBookmarkButton } from '../../components/article/ArticleBookmarkButton';
import { ArticleFavoriteButton } from '../../components/article/ArticleFavoriteButton';
import { ArticleFollowButton } from '../../components/article/ArticleFollowButtont';
import { ArticleImage } from '../../components/article/ArticleImage';
import { ArticleMenu } from '../../components/article/ArticleMenu';
import { ArticleTagList } from '../../components/article/ArticleTagList';
import { ArticleTime } from '../../components/article/ArticleTime';
import { NoArticleFound } from '../../components/article/NoArticleFound';
import { CommentSection } from '../../components/comment/CommentSection';
import { Layout } from '../../components/layout/Layout';

interface ArticleProps {
  article: ArticleResponse;
}

const Article = ({ article }: ArticleProps) => {
  if (!article) {
    return <NoArticleFound />;
  }

  const { user } = useGetCurrentUser();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { data, error, mutate } = useSWR(`/articles/${article.slug}`, {
    initialData: article,
  });

  if (!data || error) {
    return <NoArticleFound />;
  }

  return (
    <Layout>
      <NextSeo title={data.title} description={data.description} />
      <Flex direction="column" justify="center" mx={['4', '4', '4', 'auto']}>
        <Flex align="center">
          <Heading mr="10">{data.title}</Heading>
          {user?.id === article.author.id && <ArticleMenu article={data} />}
        </Flex>
        <Stack isInline my="5">
          <Avatar name={data.author.username} src={data.author.image} />
          <Box>
            <Flex justify="space-between" align="center">
              <Link href={`/${data.author.username}`} fontWeight="semibold">
                {data.author.username}
              </Link>
              <ArticleFollowButton article={data} mutate={mutate} />
            </Flex>
            <ArticleTime createdAt={data.createdAt} />
          </Box>
        </Stack>
        <Text fontWeight="semibold" fontSize="18px" mb="5">
          {data.description}
        </Text>
        <ArticleImage article={article} />
        <Box mt="10">
          <ReactMarkdown
            className="markdown-body"
            renderers={ChakraUIRenderer()}
            source={data.body}
            escapeHtml={false}
          />
        </Box>
        <ArticleTagList tagList={data.tagList} />
        <Flex mt="10" justify="space-between">
          <Flex align="center">
            <ArticleFavoriteButton article={data} mutate={mutate} />
            <Button
              variant="ghost"
              aria-label="Favorite Article"
              leftIcon={<ChatIcon />}
              size="lg"
              ml="8"
              onClick={() => handleToggle()}
            >
              <Text pl="2" fontSize="sm">
                View Comments
              </Text>
            </Button>
          </Flex>
          <ArticleBookmarkButton article={data} mutate={mutate} />
        </Flex>
        <Divider my="5" />
        <Stack isInline>
          <Avatar name={data.author.username} src={data.author.image} size="lg" />
          <Box>
            <Text textTransform="uppercase" fontSize="sm" letterSpacing="wide" color="gray.500">
              Written by
            </Text>
            <Flex justify="space-between" align="center">
              <Link href={`/${data.author.username}`}>
                <Heading as="h3" size="lg">
                  {data.author.username}
                </Heading>
              </Link>

              <ArticleFollowButton article={data} mutate={mutate} />
            </Flex>
            <Text mt="2" color="gray.600">
              {data.author.bio}
            </Text>
          </Box>
        </Stack>
        <Divider my="5" />
        {/*@ts-ignore*/}
        <Collapse mt={4} in={show} id={'comments'}>
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
