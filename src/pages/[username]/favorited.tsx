import React from 'react';
import { GetServerSideProps } from 'next';
import { Box, Flex, Stack, TabPanel, TabPanels, Text } from '@chakra-ui/core';

import { getAuthorFavorites, getProfile, setCookie } from '../../api';
import { ArticleResponse, ProfileResponse } from '../../api/models';
import { useGetProfile } from '../../api/useGetProfile';
import { useGetProfileFavorites } from '../../api/useGetProfileFavorites';
import { Layout } from '../../components/layout/Layout';
import { NoProfileFound } from '../../components/profile/NoProfileFound';
import { ProfileArticle } from '../../components/profile/ProfileArticle';
import { ProfileBox } from '../../components/profile/ProfileBox';
import { ProfileTabHeader } from '../../components/profile/ProfileTabHeader';
import { ProfileTabs } from '../../components/profile/ProfileTabs';
import { ProfileWrapper } from '../../components/profile/ProfileWrapper';

interface ProfileProps {
  profile: ProfileResponse;
  articles: ArticleResponse[];
}

const Favorited = (profileProps: ProfileProps) => {
  if (!profileProps.profile) {
    return <NoProfileFound />;
  }

  const { data, error } = useGetProfile(profileProps);

  const { articles: profileArticles } = useGetProfileFavorites(profileProps);

  if (error || !data) {
    return <NoProfileFound />;
  }

  return (
    <Layout>
      <ProfileWrapper>
        <ProfileBox profile={data} />
        <ProfileTabs username={data.username} tabIndex={1}>
          <TabPanels>
            <TabPanel>
              <ProfileTabHeader isNotSelectedTab={true}>
                Latest
              </ProfileTabHeader>
            </TabPanel>
            <TabPanel>
              <ProfileTabHeader>Favorited</ProfileTabHeader>
              {profileArticles?.length === 0 ? (
                <Box height="80vh" m="auto">
                  <Text fontWeight="semibold">
                    This user has not favorited any article yet.
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
          </TabPanels>
        </ProfileTabs>
      </ProfileWrapper>
    </Layout>
  );
};

export default Favorited;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  setCookie(ctx?.req?.headers?.cookie);
  const username = ctx?.query.username as string;

  try {
    const { data: profile } = await getProfile(username);
    const { data } = await getAuthorFavorites(username);
    const { articles } = data;
    return { props: { profile, articles } };
  } catch (err) {
    return { props: { profile: null, articles: null } };
  }
};
