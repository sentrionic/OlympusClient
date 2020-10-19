import React from 'react';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import useSWR, { mutate, trigger } from 'swr';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
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
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Textarea,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/core';

import { Layout } from '../../components/layout/Layout';
import {
  getArticleBySlug,
  setCookie,
  unfavoriteArticle,
  favoriteArticle,
  getCurrentUser,
  deleteComment,
  createComment,
} from '../../api';
import { ArticleResponse, CommentResponse } from '../../api/models';
import { getCommentTime, getTime } from '../../utils/getTime';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { useRouter } from 'next/router';
import { ArticleMenu } from '../../components/article/ArticleMenu';
import { Formik } from 'formik';
import { InputField } from '../../components/common/InputField';

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

  const router = useRouter();
  const { user } = useGetCurrentUser();
  const [show, setShow] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const handleToggle = () => setShow(!show);

  const { data, error } = useSWR(`/articles/${article.slug}`, {
    initialData: article,
  });

  if (!data || error) {
    return null;
  }

  const { data: commentData, mutate: commentMutate } = useSWR<
    CommentResponse[]
  >(show ? `articles/${article.slug}/comments` : null);

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

  const onConfirm = async ({ id }) => {
    setIsOpen(false);
    const { data } = await deleteComment(article.slug, id);
    if (data) {
      mutate(`articles/${article.slug}/comments`);
    }
  };

  return (
    <Layout>
      <Flex direction="column" justify="center">
        <Flex align="center">
          <Heading mr="10">{data.title}</Heading>
          <ArticleMenu article={data} />
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
            <PseudoBox key={t} _hover={{ cursor: 'pointer' }} mr="4">
              <Badge p="2" rounded="md">
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
              onClick={() => {
                toggleFavorite();
              }}
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
              onClick={() => handleToggle()}
            />
            <Text pl="2" fontSize="sm">
              View Comments
            </Text>
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
              <NextLink href={'/[username]'} as={`/${data.author.username}`}>
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
        <Collapse mt={4} isOpen={show} id={'comments'}>
          <Box>
            <Text fontWeight="semibold" fontSize="18px" mb="5">
              Comments
            </Text>
            <Flex align="flex-end">
              <Formik
                initialValues={{
                  body: '',
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                  try {
                    const { data } = await createComment(article.slug, values);

                    if (data) {
                      commentMutate([...commentData, data], false);
                      resetForm();
                    }
                  } catch (err) {
                    if (err?.response?.data?.errors) {
                      const errors = err?.response?.data?.errors;
                      Object.keys(errors).map((key) => {
                        setErrors({ [key]: errors[key] });
                      });
                    }
                  }
                }}
              >
                {({
                  isSubmitting,
                  handleChange,
                  errors,
                  touched,
                  values,
                  handleSubmit,
                }) => (
                  <>
                    <FormControl
                      isInvalid={errors.body && touched.body}
                      w="full"
                    >
                      <Textarea
                        value={values.body}
                        name="body"
                        onChange={handleChange}
                        placeholder="What are your thoughts?"
                      />
                      <FormErrorMessage>{errors.body}</FormErrorMessage>
                    </FormControl>

                    <Button
                      variantColor="blue"
                      variant="outline"
                      ml={4}
                      size="sm"
                      color="blue"
                      isLoading={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Post Comment
                    </Button>
                  </>
                )}
              </Formik>
            </Flex>
            <Stack spacing={2} mt="4">
              {commentData?.length === 0 ? (
                <Text>No Comments Yet</Text>
              ) : (
                commentData?.map((c) => (
                  <Flex p={3} key={c.id} justify="space-between" align="center">
                    <Flex>
                      <Avatar name={c.author.username} src={c.author.image} />
                      <Box>
                        <Flex ml="3">
                          <NextLink
                            href={'/[username]'}
                            as={`/${c.author.username}`}
                          >
                            <Link fontWeight="bold">{c.author.username}</Link>
                          </NextLink>
                          <Text ml="2" fontSize="sm" color="gray.500">
                            {getCommentTime(c.createdAt)}
                          </Text>
                        </Flex>
                        <Text ml="3">{c.body}</Text>
                      </Box>
                    </Flex>

                    {user?.username === c.author.username && (
                      <>
                        <Menu>
                          <IconButton
                            as={MenuButton}
                            variant="outline"
                            aria-label="Settings Menu"
                            icon="chevron-down"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem onClick={() => setIsOpen(true)}>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                        <AlertDialog
                          isOpen={isOpen}
                          leastDestructiveRef={cancelRef}
                          onClose={() => setIsOpen(false)}
                        >
                          <AlertDialogOverlay />
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Comment
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button
                                ref={cancelRef}
                                onClick={() => setIsOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variantColor="red"
                                onClick={() => onConfirm(c)}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </Flex>
                ))
              )}
            </Stack>
          </Box>
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
