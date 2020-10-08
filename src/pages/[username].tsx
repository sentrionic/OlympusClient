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
import { GetServerSideProps } from 'next';
import React from 'react';
import useSWR from 'swr';
import NextLink from 'next/link';
import { getArticlesByAuthor, getUser, setCookie } from '../api';
import { ArticleResponse, ProfileResponse } from '../api/models';
import { Layout } from '../components/Layout';
import { getTime } from '../utils/getTime';

interface ProfileProps {
  profile: ProfileResponse;
  articles: ArticleResponse[];
}

const Index = (profileProps: ProfileProps) => {
  const { data, error } = useSWR(`/profile/${profileProps.profile.username}`, {
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
    return <Box>No Profile Found</Box>;
  }

  const profile = data;

  return (
    <Layout>
      <Box mx='6' p={4}>
        <Box display={{ md: 'flex' }} justifyContent='space-between'>
          <Box mt={{ base: 4, md: 0 }}>
            <Flex align='center'>
              <Text fontWeight='bold' fontSize='3xl'>
                {profile.username}
              </Text>
              <Button variant='outline' size='xs' rounded='true' ml='6'>
                {profile.following ? 'Unfollow' : 'Follow'}
              </Button>
            </Flex>
            <Text color='gray.500'>{profile.bio}</Text>
          </Box>
          <Avatar size='2xl' name={profile.username} src={profile.image} />
        </Box>

        <Tabs mt='2' size='sm' variantColor='black'>
          <TabList>
            <Tab>Profile</Tab>
            <Tab>Favorited</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text fontWeight='bold' fontSize='xl' my='6'>
                Latest
              </Text>
              <Stack spacing={8}>
                {profileArticles?.map((a) =>
                  !a ? null : (
                    <Flex
                      key={a.id}
                      p={5}
                      shadow='md'
                      borderWidth='1px'
                      m='auto'
                    >
                      <Box flex={1}>
                        <Stack isInline mb='5'>
                          <Avatar
                            name={a.author.username}
                            src={a.author.image}
                          />
                          <Box>
                            <Text fontWeight='bold' color='blue.600'>
                              {a.author.username}
                            </Text>
                            <Text>{getTime(a.createdAt)}</Text>
                          </Box>
                        </Stack>
                        <Image
                          maxW='lg'
                          borderWidth='1px'
                          rounded='lg'
                          overflow='hidden'
                          src={a.image}
                          alt={a.title}
                          objectFit='contain'
                        />
                        <NextLink
                          href='/[username]/[slug]'
                          as={`/${a.author.username}/${a.slug}`}
                        >
                          <Link>
                            <Heading fontSize='xl' pt='6'>
                              {a.title}
                            </Heading>
                          </Link>
                        </NextLink>

                        <Flex align='center'>
                          <NextLink
                            href='/[username]/[slug]'
                            as={`/${a.author.username}/${a.slug}`}
                          >
                            <Link>
                              <Text>{a.description}</Text>
                            </Link>
                          </NextLink>
                        </Flex>
                        <Flex pt='4' justify='space-between'>
                          <Flex>
                            <IconButton
                              variant='outline'
                              aria-label='Favorite Article'
                              icon='star'
                              size='sm'
                              variantColor={a.favorited ? 'yellow' : undefined}
                            />
                            <Text pl='2' fontSize='sm'>
                              {a.favoritesCount}
                            </Text>
                          </Flex>
                          <IconButton
                            variant='outline'
                            aria-label='Favorite Article'
                            icon='chat'
                            size='sm'
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  )
                )}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Text fontWeight='bold' fontSize='xl'>
                Favorited
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  setCookie(ctx?.req?.headers?.cookie);
  const username = ctx?.query.username as string;

  const { data } = await getUser(username);
  const { data: authorArticles } = await getArticlesByAuthor(username);
  const { profile } = data;
  const { articles } = authorArticles;
  return { props: { profile, articles } };
};
