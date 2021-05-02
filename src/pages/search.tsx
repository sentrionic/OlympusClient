import {
  Box,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import useSWR from 'swr';
import {
  ArticleResponse,
  PaginatedArticles,
  ProfileResponse,
} from '../api/models';
import { ArticlePreview } from '../components/article/ArticlePreview';
import { Layout } from '../components/layout/Layout';
import { ProfileTabHeader } from '../components/profile/ProfileTabHeader';
import { NoProfiles } from '../components/search/NoProfiles';
import { NoResults } from '../components/search/NoResults';
import { ProfileListItem } from '../components/search/ProfileList';
import { SearchInput } from '../components/search/SearchInput';
import { getSearchUrl } from '../utils/getSearchUrl';

interface SearchProps {
  index: number;
  query: string;
}

const Search = ({ index, query }: SearchProps) => {
  const [search, setSearch] = useState(query);
  const [order, setOrder] = useState('DESC');
  const [tabIndex, setTabIndex] = useState(index);

  const { data } = useSWR(getSearchUrl({ tabIndex, search, order }));

  return (
    <Layout>
      <NextSeo title="Search..." />
      <Box minH="100vh">
        <SearchInput
          search={search}
          setSearch={setSearch}
          setOrder={setOrder}
        />

        <Tabs
          my={5}
          colorScheme="black"
          defaultIndex={index}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab>Articles</Tab>
            <Tab>Authors</Tab>
            <Tab>Tags</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ProfileTabHeader>Articles</ProfileTabHeader>
              <Stack spacing={8}>
                {tabIndex === 0 ? (
                  data?.articles?.length === 0 ? (
                    <NoResults search={search} />
                  ) : (
                    (data as PaginatedArticles)?.articles?.map(
                      (a: ArticleResponse) =>
                        !a ? null : (
                          <Flex key={a.id}>
                            <ArticlePreview article={a} />
                          </Flex>
                        )
                    )
                  )
                ) : null}
              </Stack>
            </TabPanel>
            <TabPanel>
              <ProfileTabHeader>Authors</ProfileTabHeader>
              <Stack spacing={8}>
                {tabIndex === 1 ? (
                  data?.length === 0 ? (
                    <NoProfiles search={search} />
                  ) : (
                    (data as ProfileResponse[])?.map((p: ProfileResponse) =>
                      !p ? null : (
                        <Flex key={p.id}>
                          <ProfileListItem profile={p} />
                        </Flex>
                      )
                    )
                  )
                ) : null}
              </Stack>
            </TabPanel>
            <TabPanel>
              <ProfileTabHeader>Articles by Tag</ProfileTabHeader>
              <Stack spacing={8}>
                {tabIndex === 2 ? (
                  data?.articles?.length === 0 ? (
                    <NoResults search={search} />
                  ) : (
                    (data as PaginatedArticles)?.articles?.map(
                      (a: ArticleResponse) =>
                        !a ? null : (
                          <Flex key={a.id}>
                            <ArticlePreview article={a} />
                          </Flex>
                        )
                    )
                  )
                ) : null}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

Search.getInitialProps = ({ query }: ParsedUrlQuery) => {
  let index = 0;
  if (Object.keys(query)[0] === 'author') {
    index = 1;
  } else if (Object.keys(query)[0] === 'tag') {
    index = 2;
  }

  const value = Object.values(query)[0] || '';

  return { index, query: value };
};

export default Search;
