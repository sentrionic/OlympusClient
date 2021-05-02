import { TabPanel, TabPanels } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import useSWR from 'swr';
import { getAuthorFavorites, getProfile, setCookie } from '../../api';
import { PaginatedArticles, ProfileResponse } from '../../api/models';
import { useGetProfile } from '../../api/useGetProfile';
import { Layout } from '../../components/layout/Layout';
import { NoProfileFound } from '../../components/profile/NoProfileFound';
import { ProfileArticleList } from '../../components/profile/ProfileArticleList';
import { ProfileBox } from '../../components/profile/ProfileBox';
import { ProfileTabHeader } from '../../components/profile/ProfileTabHeader';
import { ProfileTabs } from '../../components/profile/ProfileTabs';
import { ProfileWrapper } from '../../components/profile/ProfileWrapper';

interface ProfileProps {
  profile: ProfileResponse;
  initialData: PaginatedArticles;
}

const Favorited = (profileProps: ProfileProps) => {
  if (!profileProps.profile) {
    return <NoProfileFound />;
  }

  const { data, error } = useGetProfile(profileProps);

  const { data: info, mutate } = useSWR(
    `/articles?author=${profileProps.profile.username}`,
    {
      initialData: profileProps.initialData,
    }
  );

  if (error || !data) {
    return <NoProfileFound />;
  }

  return (
    <Layout>
      <NextSeo title={`${profileProps.profile.username}'s favorites`} />
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
              <ProfileArticleList
                data={info}
                profile={data}
                dataLoader={getAuthorFavorites}
                mutate={mutate}
                noDataText={'This user has not favorited any article yet.'}
              />
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
    return { props: { profile, initialData: data } };
  } catch (err) {
    return { props: { profile: null, initialData: null } };
  }
};
