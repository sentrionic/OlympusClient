import { IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { bookmarkArticle, unbookmarkArticle } from '../../api';
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
      size='lg'
      icon={article.bookmarked ? <BsFillBookmarkFill /> : <BsBookmark />}
      onClick={() => {
        toggleBookmark();
      }}
    />
  );
};
