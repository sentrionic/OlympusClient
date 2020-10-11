import React from 'react';
import useSWR, { mutate } from 'swr';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import {
  Box,
  Button,
  Image,
  Text,
  Link,
  Flex,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
  Heading,
  IconButton,
} from '@chakra-ui/core';

import {
  followUser,
  getArticlesByAuthor,
  getProfile,
  setCookie,
  unfollowUser,
} from '../api';
import { ArticleResponse, ProfileResponse } from '../api/models';
import { Layout } from '../components/Layout';
import { getTime } from '../utils/getTime';

interface ProfileProps {
  profile: ProfileResponse;
  articles: ArticleResponse[];
}

const NoProfileFound = () => (
  <Layout>
    <Flex height="80vh">
      <Box shadow="md" borderWidth="1px" m="auto" p="10">
        <Heading>No Profile Found</Heading>
        <NextLink href="/">
          <Link>
            Go back <a>Home</a>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  </Layout>
);

const Profile = (profileProps: ProfileProps) => {
  if (!profileProps.profile) {
    return <NoProfileFound />;
  }

  const { data, error } = useSWR(`/profiles/${profileProps.profile.username}`, {
    dedupingInterval: 60000,
    initialData: profileProps.profile,
  });

  const { data: profileArticles } = useSWR(
    `/articles?author=${profileProps.profile.username}`,
    {
      initialData: profileProps.articles,
    }
  );

  if (error || !data) {
    return <NoProfileFound />;
  }

  const toggleFollow = (profile: ProfileResponse) => {
    mutate(
      `/profiles/${profile.username}`,
      {
        ...profile,
        following: !profile.following,
      },
      false
    );
    if (profile.following) {
      unfollowUser(profile.username);
    } else {
      followUser(profile.username);
    }
  };

  return (
    <Layout>
      <Box mx="6" p={4}>
        <Box display={{ md: 'flex' }} justifyContent="space-between">
          <Box mt={{ base: 4, md: 0 }}>
            <Flex align="center">
              <Text fontWeight="bold" fontSize="3xl">
                {data.username}
              </Text>
              <Button
                variant="outline"
                size="xs"
                rounded="true"
                ml="6"
                onClick={() => toggleFollow(data)}
              >
                {data.following ? 'Unfollow' : 'Follow'}
              </Button>
            </Flex>
            <Text color="gray.500">{data.bio}</Text>
            <Flex align="center">
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                {data.followee} Following
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight="semibold" ml="5">
                {data.followers} Followers
              </Text>
            </Flex>
          </Box>
          <Avatar size="2xl" name={data.username} src={data.image} />
        </Box>

        <Tabs mt="2" size="sm" variantColor="black">
          <TabList>
            <Tab>
              <NextLink href={`/${data.username}`}>Profile</NextLink>
            </Tab>
            <Tab>
              <NextLink href={`/${data.username}/favorited`}>
                Favorited
              </NextLink>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text fontWeight="bold" fontSize="xl" my="6">
                Latest
              </Text>
              {profileArticles?.length === 0 ? (
                <Box height="80vh" m="auto">
                  <Text fontWeight="semibold">
                    This user has not posted an article yet.
                  </Text>
                </Box>
              ) : (
                <Stack spacing={8}>
                  {profileArticles.map((a) =>
                    !a ? null : (
                      <Flex
                        key={a.id}
                        p={5}
                        shadow="md"
                        borderWidth="1px"
                        m="auto"
                      >
                        <Box flex={1}>
                          <Stack isInline mb="5">
                            <Avatar
                              name={a.author.username}
                              src={a.author.image}
                            />
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

                          <Flex align="center">
                            <NextLink
                              href="/[username]/[slug]"
                              as={`/${a.author.username}/${a.slug}`}
                            >
                              <Link>
                                <Text>{a.description}</Text>
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
                                variantColor={
                                  a.favorited ? 'yellow' : undefined
                                }
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
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  setCookie(ctx?.req?.headers?.cookie);
  const username = ctx?.query.username as string;

  try {
    const { data: profile } = await getProfile(username);
    const { data } = await getArticlesByAuthor(username);
    const { articles } = data;
    return { props: { profile, articles } };
  } catch (err) {
    return { props: { profile: null, articles: null } };
  }
};
