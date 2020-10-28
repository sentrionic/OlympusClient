import { Flex, IconButton, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { favoriteArticle, unfavoriteArticle } from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

interface ArticleActionsProps {
  article: ArticleResponse;
  setPreview: Function;
}

export const ArticleAction: React.FC<ArticleActionsProps> = ({
  article,
  setPreview,
}) => {
  const { user } = useGetCurrentUser();
  const router = useRouter();

  const handleFavorite = ({
    slug,
    favorited,
    favoritesCount,
  }: ArticleResponse) => {
    if (!user) {
      return router.replace('/login?next=' + router.asPath);
    }

    setPreview({
      ...article,
      favorited: !favorited,
      favoritesCount: favoritesCount += favorited ? -1 : 1,
    });

    if (favorited) {
      unfavoriteArticle(slug);
    } else {
      favoriteArticle(slug);
    }
  };

  const handleComment = async () => {
    await router.push(`/${article.author.username}/${article.slug}/#comments`);
  };

  return (
    <Flex pt='4' justify='space-between'>
      <Flex align='center'>
        <IconButton
          variant='ghost'
          aria-label='Favorite Article'
          icon='star'
          size='lg'
          variantColor={article.favorited ? 'yellow' : undefined}
          onClick={() => handleFavorite(article)}
        />
        <Text pl='2' fontSize='sm'>
          {article.favoritesCount}
        </Text>
      </Flex>
      <IconButton
        variant='ghost'
        aria-label='Favorite Article'
        icon='chat'
        size='lg'
        onClick={() => handleComment()}
      />
    </Flex>
  );
};
