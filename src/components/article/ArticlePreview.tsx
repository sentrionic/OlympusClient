import { Box, Flex, Heading, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { ArticleResponse } from '../../api/models';
import { ArticleAction } from './ArticleActions';
import { ArticleHeader } from './ArticleHeader';
import { ArticleImage } from './ArticleImage';

interface ArticlePreviewProps {
  article: ArticleResponse;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const [preview, setPreview] = useState(article);

  return (
    <Flex p={5} shadow="md" borderWidth="1px" m="auto">
      <Box flex={1}>
        <ArticleHeader article={preview} />
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
        <Text>{preview.description}</Text>
        <Flex align="center">
          <NextLink
            href="/[username]/[slug]"
            as={`/${preview.author.username}/${preview.slug}`}
          >
            <Link>
              <Text fontSize="s" pt="6">
                Read more...
              </Text>
            </Link>
          </NextLink>
        </Flex>
        <ArticleAction article={preview} setPreview={setPreview} />
      </Box>
    </Flex>
  );
};
