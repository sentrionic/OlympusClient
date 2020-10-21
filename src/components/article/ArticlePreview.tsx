import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { ArticleHeader } from './ArticleHeader';
import { favoriteArticle, unfavoriteArticle } from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

interface ArticlePreviewProps {
  article: ArticleResponse;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const { user } = useGetCurrentUser();

  const [preview, setPreview] = useState(article);
  const router = useRouter();

  const handleFavorite = ({
    slug,
    favorited,
    favoritesCount,
  }: ArticleResponse) => {
    if (!user) {
      return router.replace('/login?next=' + router.pathname);
    }

    setPreview({
      ...preview,
      favorited: !favorited,
      favoritesCount: favoritesCount += favorited ? -1 : 1,
    });

    if (favorited) {
      unfavoriteArticle(slug);
    } else {
      favoriteArticle(slug);
    }
  };

  return (
    <Flex p={5} shadow="md" borderWidth="1px" m="auto">
      <Box flex={1}>
        <ArticleHeader article={preview} />
        <Image
          maxW="lg"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          src={preview.image}
          alt={preview.title}
          objectFit="contain"
        />
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
        <Flex pt="4" justify="space-between">
          <Flex align="center">
            <IconButton
              variant="ghost"
              aria-label="Favorite Article"
              icon="star"
              size="md"
              variantColor={preview.favorited ? 'yellow' : undefined}
              onClick={() => handleFavorite(preview)}
            />
            <Text pl="2" fontSize="sm">
              {preview.favoritesCount}
            </Text>
          </Flex>
          <IconButton
            variant="ghost"
            aria-label="Favorite Article"
            icon="chat"
            size="md"
            onClick={async () =>
              await router.push(
                `/${preview.author.username}/${preview.slug}/#comments`
              )
            }
          />
        </Flex>
      </Box>
    </Flex>
  );
};
