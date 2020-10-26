import { Box, Flex, Heading, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { ArticleResponse } from '../../api/models';
import { ArticleAction } from '../article/ArticleActions';
import { ArticleHeader } from '../article/ArticleHeader';
import { ArticleImage } from '../article/ArticleImage';

interface ProfileArticleProps {
  article: ArticleResponse;
}

export const ProfileArticle: React.FC<ProfileArticleProps> = ({ article }) => {
  const [preview, setPreview] = useState(article);
  return (
    <Flex p={5} shadow="md" borderWidth="1px" m="auto">
      <Box maxW="32rem">
        <ArticleHeader article={article} />
        <ArticleImage article={preview} />
        <NextLink
          href="/[username]/[slug]"
          as={`/${preview.author.username}/${preview.slug}`}
        >
          <Link>
            <Heading fontSize="xl" pt="6">
              {preview.title}
            </Heading>
          </Link>
        </NextLink>

        <Flex align="center">
          <NextLink
            href="/[username]/[slug]"
            as={`/${preview.author.username}/${preview.slug}`}
          >
            <Link>
              <Text>{preview.description}</Text>
            </Link>
          </NextLink>
        </Flex>
        <ArticleAction article={preview} setPreview={setPreview} />
      </Box>
    </Flex>
  );
};
