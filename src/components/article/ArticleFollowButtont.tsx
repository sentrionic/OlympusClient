import { Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { followUser, unfollowUser } from '../../api';
import { ArticleResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

interface ArticleFollowButtonProps {
  article: ArticleResponse;
  mutate: Function;
}

export const ArticleFollowButton: React.FC<ArticleFollowButtonProps> = ({
  article,
  mutate,
}) => {
  const { user } = useGetCurrentUser();
  const router = useRouter();

  const toggleFollow = () => {
    if (!user) {
      return router.replace(
        '/login?next=' + router.query.username + '/' + router.query.slug
      );
    }

    const isFollowing = article.author.following;

    mutate(
      {
        ...article,
        author: { ...article.author, following: !isFollowing },
      },
      false
    );

    if (isFollowing) {
      unfollowUser(article.author.username);
    } else {
      followUser(article.author.username);
    }
  };

  if (user?.id === article.author.id) return null;

  return (
    <Button
      variant='outline'
      size='xs'
      rounded='true'
      ml='3'
      onClick={() => toggleFollow()}
    >
      {article.author.following ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
