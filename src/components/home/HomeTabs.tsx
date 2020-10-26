import { Tab, TabList, Tabs } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';

interface HomeTabsProps {
  tabIndex?: number;
}

export const HomeTabs: React.FC<HomeTabsProps> = ({
  children,
  tabIndex = 0,
}) => {
  return (
    <Tabs align='center' variant='soft-rounded' defaultIndex={tabIndex}>
      <TabList>
        <Tab>
          <NextLink href={'/'}>Global</NextLink>
        </Tab>
        <Tab>
          <NextLink href={'/feed'}>Feed</NextLink>
        </Tab>
      </TabList>
      {children}
    </Tabs>
  );
};
