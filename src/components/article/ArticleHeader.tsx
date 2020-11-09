import { Avatar, Box, Flex, Link, Stack } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { ArticleMenu } from './ArticleMenu';
import { ArticleTime } from './ArticleTime';

interface ArticleHeaderProps {
  article: ArticleResponse;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  const { user } = useGetCurrentUser();

  return (
    <Flex mb='5' justify='space-between'>
      <Stack isInline>
        <Avatar name={article.author.username} src={article.author.image} />
        <Box>
          <Link
            href={`/${article.author.username}`}
            fontWeight='bold'
            color='blue.600'
          >
            {article.author.username}
          </Link>
          <ArticleTime createdAt={article.createdAt} />
        </Box>
      </Stack>
      {user?.username === article.author.username && (
        <ArticleMenu article={article} />
      )}
    </Flex>
  );
};
