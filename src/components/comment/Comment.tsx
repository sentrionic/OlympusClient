import { Avatar, Box, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { CommentResponse } from '../../api/models';
import { getCommentTime } from '../../utils/getTime';

interface CommentProps {
  comment: CommentResponse;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Flex>
      <Avatar name={comment.author.username} src={comment.author.image} />
      <Box>
        <Flex ml="3">
          <Link href={`/${comment.author.username}`} fontWeight="bold">
            {comment.author.username}
          </Link>
          <Text ml="2" fontSize="sm" color="gray.500">
            {getCommentTime(comment.createdAt)}
          </Text>
        </Flex>
        <Text ml="3">{comment.body}</Text>
      </Box>
    </Flex>
  );
};
