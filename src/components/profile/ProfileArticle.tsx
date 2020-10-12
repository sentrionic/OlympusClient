import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';

import { ArticleResponse } from '../../api/models';
import { getTime } from '../../utils/getTime';

interface ProfileArticleProps {
  article: ArticleResponse;
}

export const ProfileArticle: React.FC<ProfileArticleProps> = ({ article }) => {
  return (
    <Flex p={5} shadow="md" borderWidth="1px" m="auto">
      <Box flex={1}>
        <Stack isInline mb="5">
          <Avatar name={article.author.username} src={article.author.image} />
          <Box>
            <Text fontWeight="bold" color="blue.600">
              {article.author.username}
            </Text>
            <Text>{getTime(article.createdAt)}</Text>
          </Box>
        </Stack>
        <Flex justify="center">
          <Image
            maxW="lg"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            src={article.image}
            alt={article.title}
            objectFit="contain"
          />
        </Flex>
        <NextLink
          href="/[username]/[slug]"
          as={`/${article.author.username}/${article.slug}`}
        >
          <Link>
            <Heading fontSize="xl" pt="6">
              {article.title}
            </Heading>
          </Link>
        </NextLink>

        <Flex align="center">
          <NextLink
            href="/[username]/[slug]"
            as={`/${article.author.username}/${article.slug}`}
          >
            <Link>
              <Text>{article.description}</Text>
            </Link>
          </NextLink>
        </Flex>
        <Flex pt="4" justify="space-between">
          <Flex>
            <IconButton
              variant="outline"
              aria-label="Favorite Article"
              icon="star"
              size="sm"
              variantColor={article.favorited ? 'yellow' : undefined}
            />
            <Text pl="2" fontSize="sm">
              {article.favoritesCount}
            </Text>
          </Flex>
          <IconButton
            variant="outline"
            aria-label="Favorite Article"
            icon="chat"
            size="sm"
          />
        </Flex>
      </Box>
    </Flex>
  );
};
