import { Flex, IconButton, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsStar,
  BsStarFill,
} from 'react-icons/bs';
import {
  bookmarkArticle,
  favoriteArticle,
  unbookmarkArticle,
  unfavoriteArticle,
} from '../../api';
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

  const handleBookmark = ({ slug, bookmarked }: ArticleResponse) => {
    if (!user) {
      return router.replace('/login?next=' + router.asPath);
    }

    setPreview({
      ...article,
      bookmarked: !bookmarked,
    });

    if (bookmarked) {
      unbookmarkArticle(slug);
    } else {
      bookmarkArticle(slug);
    }
  };

  const handleComment = async () => {
    await router.push(`/${article.author.username}/${article.slug}/#comments`);
  };

  return (
    <Flex pt='4' justify='space-between'>
      <Flex>
        <Flex align='center'>
          <IconButton
            variant='ghost'
            aria-label='Favorite Article'
            icon={article.favorited ? BsStarFill : BsStar}
            size='lg'
            variantColor={article.favorited ? 'yellow' : undefined}
            onClick={() => handleFavorite(article)}
          />
          <Text ml='2' fontSize='sm'>
            {article.favoritesCount}
          </Text>
        </Flex>
        <IconButton
          variant='ghost'
          aria-label='Favorite Article'
          icon='chat'
          size='lg'
          ml='2'
          onClick={() => handleComment()}
        />
      </Flex>
      <IconButton
        variant='ghost'
        aria-label='Bookmark Article'
        icon={article.bookmarked ? BsFillBookmarkFill : BsBookmark}
        size='lg'
        onClick={() => handleBookmark(article)}
      />
    </Flex>
  );
};
