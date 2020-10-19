import { Box, Flex, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import useSWR from 'swr';
import { ArticleResponse, CommentResponse } from '../../api/models';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';
import { Comment } from './Comment';
import { CommentBox } from './CommentBox';
import { CommentMenu } from './CommentMenu';

interface CommentSectionProps {
  article: ArticleResponse;
  isShown: boolean;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  article,
  isShown,
}) => {
  const { user } = useGetCurrentUser();

  const { data, mutate: commentMutate } = useSWR<CommentResponse[]>(
    isShown ? `articles/${article.slug}/comments` : null
  );

  const addComment = (comment: CommentResponse) => {
    commentMutate([...data, comment], false);
  };

  return (
    <Box>
      <Text fontWeight='semibold' fontSize='18px' mb='5'>
        Comments
      </Text>
      <CommentBox article={article} addComment={addComment} />
      <Stack spacing={2} mt='4'>
        {data?.length === 0 ? (
          <Text>No Comments Yet</Text>
        ) : (
          data?.map((c) => (
            <Flex p={3} key={c.id} justify='space-between' align='center'>
              <Comment comment={c} />
              {user?.username === c.author.username && (
                <CommentMenu slug={article.slug} id={c.id} />
              )}
            </Flex>
          ))
        )}
      </Stack>
    </Box>
  );
};
