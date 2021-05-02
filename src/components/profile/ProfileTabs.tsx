import { Tab, TabList, Tabs } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

interface ProfileTabsProps {
  username: string;
  tabIndex?: number;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  children,
  username,
  tabIndex = 0,
}) => {
  return (
    <Tabs mt='2' size='sm' colorScheme='black' defaultIndex={tabIndex}>
      <TabList>
        <Tab>
          <NextLink href={'/[username]'} as={`/${username}`}>
            Profile
          </NextLink>
        </Tab>
        <Tab>
          <NextLink
            href={'/[username]/favorited'}
            as={`/${username}/favorited`}
          >
            Favorited
          </NextLink>
        </Tab>
      </TabList>
      {children}
    </Tabs>
  );
};
