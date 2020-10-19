import React from 'react';
import useSWR from 'swr';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getAllArticles } from '../api';
import { ArticlePreview } from '../components/article/ArticlePreview';
import { Layout } from '../components/layout/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { HomeTabs } from '../components/home/HomeTabs';
import { LoadingSpinner } from '../components/home/LoadingSpinner';
import { ProfileTabHeader } from '../components/profile/ProfileTabHeader';

const Search = () => {
  return (
    <Layout>
      <Box minH="100vh">
        <Flex>
          <InputGroup size="lg" w="full">
            <Input
              variant="flushed"
              focusBorderColor="black"
              placeholder="Search OlympusBlog"
              size="lg"
            />
            <InputRightElement>
              <IconButton
                variant="outline"
                variantColor="blue"
                aria-label="Search"
                icon="search"
              />
            </InputRightElement>
          </InputGroup>
          <Select
            placeholder="Order"
            variant="flushed"
            focusBorderColor="black"
            size="lg"
            mb="auto"
            w="150px"
            ml="4"
          >
            <option value="desc">DESC</option>
            <option value="asc">ASC</option>
          </Select>
        </Flex>

        <Tabs my={5} variantColor="black">
          <TabList>
            <Tab>Articles</Tab>
            <Tab>Authors</Tab>
            <Tab>Tags</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ProfileTabHeader>Articles</ProfileTabHeader>
            </TabPanel>
            <TabPanel>
              <ProfileTabHeader>Authors</ProfileTabHeader>
            </TabPanel>
            <TabPanel>
              <ProfileTabHeader>Articles by Tag</ProfileTabHeader>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default Search;
