import { IconButton, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import {
  bookmarkArticle,
  favoriteArticle,
  unbookmarkArticle,
  unfavoriteArticle,
} from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

interface ArticleBookmarkButtonProps {
  article: ArticleResponse;
  mutate: Function;
}

export const ArticleBookmarkButton: React.FC<ArticleBookmarkButtonProps> = ({
  article,
  mutate,
}) => {
  const { user } = useGetCurrentUser();
  const router = useRouter();

  const toggleBookmark = () => {
    if (!user) {
      return router.replace('/login?next=' + router.asPath);
    }

    const bookmarked = article.bookmarked;
    mutate(
      {
        ...article,
        bookmarked: !bookmarked,
      },
      false
    );

    if (bookmarked) {
      unbookmarkArticle(article.slug);
    } else {
      bookmarkArticle(article.slug);
    }
  };

  return (
    <IconButton
      variant='ghost'
      aria-label='Bookmark Article'
      icon='lock'
      size='lg'
      variantColor={article.bookmarked ? 'teal' : undefined}
      onClick={() => {
        toggleBookmark();
      }}
    />
  );
};
