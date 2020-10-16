import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import { ArticleResponse } from '../../api/models';

interface ArticleMenuProps {
  article: ArticleResponse;
}

export const ArticleMenu: React.FC<ArticleMenuProps> = ({ article }) => {
  return (
    <Menu>
      <IconButton
        as={MenuButton}
        variant="outline"
        aria-label="Settings Menu"
        icon="chevron-down"
        size="sm"
      />
      <MenuList>
        <NextLink
          href={'/[username]/[slug]/edit'}
          as={`/${article.author.username}/${article.slug}/edit`}
        >
          <MenuItem>Edit</MenuItem>
        </NextLink>
        <NextLink
          href={'/[username]/[slug]/delete'}
          as={`/${article.author.username}/${article.slug}/delete`}
        >
          <MenuItem>Delete</MenuItem>
        </NextLink>
      </MenuList>
    </Menu>
  );
};
