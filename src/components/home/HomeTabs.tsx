import { Tab, TabList, Tabs } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useGetCurrentUser } from "../../api/useGetCurrentUser";

interface HomeTabsProps {
  tabIndex?: number;
}

export const HomeTabs: React.FC<HomeTabsProps> = ({
  children,
  tabIndex = 0,
}) => {
  const { user } = useGetCurrentUser();
  return (
    <Tabs align="center" variant="soft-rounded" defaultIndex={tabIndex}>
      <TabList>
        <Tab>
          <NextLink href={"/"}>Global</NextLink>
        </Tab>
        {user && (
          <Tab>
            <NextLink href={"/feed"}>Feed</NextLink>
          </Tab>
        )}
        {user && (
          <Tab>
            <NextLink href={"/bookmarked"}>Bookmarked</NextLink>
          </Tab>
        )}
      </TabList>
      {children}
    </Tabs>
  );
};
