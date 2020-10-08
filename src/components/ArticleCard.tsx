import {
  Box,
  Stack,
  Text,
  Link,
  Flex,
  Image,
  Avatar,
  Heading,
  IconButton,
} from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { ArticleResponse } from '../api/models';
import { getTime } from '../utils/getTime';

type ArticleCardProps = {
  article: ArticleResponse;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Flex key={article.id} p={5} shadow='md' borderWidth='1px' m='auto'>
      <Box flex={1}>
        <Stack isInline mb='5'>
          <Avatar name={article.author.username} src={article.author.image} />
          <Box>
            <Text fontWeight='bold' color='blue.600'>
              {article.author.username}
            </Text>
            <Text>{getTime(article.createdAt)}</Text>
          </Box>
        </Stack>
        <Image
          maxW='lg'
          borderWidth='1px'
          rounded='lg'
          overflow='hidden'
          src={article.image}
          alt={article.title}
          objectFit='contain'
        />
        <NextLink
          href='/[username]/[slug]'
          as={`/${article.author.username}/${article.slug}`}
        >
          <Link>
            <Heading fontSize='xl' pt='6'>
              {article.title}
            </Heading>
          </Link>
        </NextLink>
        <Text>{article.description}</Text>
        <Flex align='center'>
          <NextLink
            href='/[username]/[slug]'
            as={`/${article.author.username}/${article.slug}`}
          >
            <Link>
              <Text fontSize='s' pt='6'>
                Read more...
              </Text>
            </Link>
          </NextLink>
        </Flex>
        <Flex pt='4' justify='space-between'>
          <Flex>
            <IconButton
              variant='outline'
              aria-label='Favorite Article'
              icon='star'
              size='sm'
              variantColor={article.favorited ? 'yellow' : undefined}
            />
            <Text pl='2' fontSize='sm'>
              {article.favoritesCount}
            </Text>
          </Flex>
          <IconButton
            variant='outline'
            aria-label='Favorite Article'
            icon='chat'
            size='sm'
          />
        </Flex>
      </Box>
    </Flex>
  );
};
