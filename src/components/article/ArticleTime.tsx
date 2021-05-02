import { Text } from '@chakra-ui/react';
import React from 'react';
import { getTime } from '../../utils/getTime';

interface ArticleTimeProps {
  createdAt: string;
}

export const ArticleTime: React.FC<ArticleTimeProps> = ({ createdAt }) => {
  return <Text>{getTime(createdAt)}</Text>;
};
