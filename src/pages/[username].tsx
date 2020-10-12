import React from 'react';
import { GetServerSideProps } from 'next';
import { Box, Flex, Stack, TabPanel, TabPanels, Text } from '@chakra-ui/core';

import { getArticlesByAuthor, getProfile, setCookie } from '../api';
import { ArticleResponse, ProfileResponse } from '../api/models';
import { useGetProfile } from '../api/useGetProfile';
import { useGetProfileArticles } from '../api/useGetProfileArticles';
import { Layout } from '../components/layout/Layout';
import { NoProfileFound } from '../components/profile/NoProfileFound';
import { ProfileArticle } from '../components/profile/ProfileArticle';
import { ProfileBox } from '../components/profile/ProfileBox';
import { ProfileTabHeader } from '../components/profile/ProfileTabHeader';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { ProfileWrapper } from '../components/profile/ProfileWrapper';

interface ProfileProps {
  profile: ProfileResponse;
  articles: ArticleResponse[];
}

const Profile = (profileProps: ProfileProps) => {
  if (!profileProps.profile) {
    return <NoProfileFound />;
  }

  const { data, error } = useGetProfile(profileProps);
  const { articles: profileArticles } = useGetProfileArticles(profileProps);

  if (error || !data) {
    return <NoProfileFound />;
  }

  return (
    <Layout>
      <ProfileWrapper>
        <ProfileBox profile={data} />
        <ProfileTabs username={data.username}>
          <TabPanels>
            <TabPanel>
              <ProfileTabHeader>Latest</ProfileTabHeader>
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
                      <Flex key={a.id}>
                        <ProfileArticle article={a} />
                      </Flex>
                    )
                  )}
                </Stack>
              )}
            </TabPanel>
            <TabPanel>
              <ProfileTabHeader isNotSelectedTab={true}>
                Favorited
              </ProfileTabHeader>
            </TabPanel>
          </TabPanels>
        </ProfileTabs>
      </ProfileWrapper>
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
