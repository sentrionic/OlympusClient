import { Badge, Flex, PseudoBox } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';

interface ArticleTagListProps {
  tagList: string[];
}

export const ArticleTagList: React.FC<ArticleTagListProps> = ({ tagList }) => {
  return (
    <Flex mt="5">
      {tagList.map((t) => (
        <NextLink key={t} href={{ pathname: '/search', query: { tag: [t] } }}>
          <PseudoBox key={t} _hover={{ cursor: 'pointer' }} mr="4">
            <Badge p="2" rounded="md">
              {t}
            </Badge>
          </PseudoBox>
        </NextLink>
      ))}
    </Flex>
  );
};
