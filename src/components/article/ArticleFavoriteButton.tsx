import { IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { favoriteArticle, unfavoriteArticle } from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

interface ArticleFavoriteButtonProps {
  article: ArticleResponse;
  mutate: Function;
}

export const ArticleFavoriteButton: React.FC<ArticleFavoriteButtonProps> = ({
  article,
  mutate,
}) => {
  const { user } = useGetCurrentUser();
  const router = useRouter();

  const toggleFavorite = () => {
    if (!user) {
      return router.replace('/login?next=' + router.asPath);
    }

    const favorited = article.favorited;
    const favoritesCount = (article.favoritesCount += favorited ? -1 : 1);
    mutate(
      {
        ...article,
        favorited: !favorited,
        favoritesCount,
      },
      false
    );

    if (favorited) {
      unfavoriteArticle(article.slug);
    } else {
      favoriteArticle(article.slug);
    }
  };

  return (
    <>
      <IconButton
        variant='ghost'
        aria-label='Favorite Article'
        icon={article.favorited ? <BsStarFill /> : <BsStar />}
        size='lg'
        colorScheme={article.favorited ? 'yellow' : undefined}
        onClick={() => {
          toggleFavorite();
        }}
      />
      <Text pl='2' fontSize='sm'>
        {article.favoritesCount}
      </Text>
    </>
  );
}
