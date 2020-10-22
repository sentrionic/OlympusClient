import { Flex, Image } from '@chakra-ui/core';
import React from 'react';
import { ArticleResponse } from '../../api/models';

interface ArticleImageProps {
  article: ArticleResponse;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  return (
    <Flex justify="center" align="center">
      <Image
        maxW="lg"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        src={article.image}
        alt={article.title}
        objectFit="contain"
      />
    </Flex>
  );
};
