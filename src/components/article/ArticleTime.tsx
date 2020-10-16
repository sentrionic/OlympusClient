import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { ArticleResponse } from '../../api/models';
import { getTime } from '../../utils/getTime';

interface ArticleTimeProps {
  createdAt: string;
}

export const ArticleTime: React.FC<ArticleTimeProps> = ({ createdAt }) => {
  return <Text>{getTime(createdAt)}</Text>;
};
