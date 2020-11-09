import { Box, Flex, Heading, Link, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import { ArticleResponse } from '../../api/models';
import { ArticleAction } from './ArticleActions';
import { ArticleHeader } from './ArticleHeader';
import { ArticleImage } from './ArticleImage';

interface ArticlePreviewProps {
  article: ArticleResponse;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const [preview, setPreview] = useState(article);

  return (
    <Flex p={5} shadow='md' borderWidth='1px' m='auto'>
      <Box maxW={['28rem', '28rem', '32rem']}>
        <ArticleHeader article={preview} />
        <ArticleImage article={preview} />
        <Box mt='6'>
          <Link href={`/${preview.author.username}/${preview.slug}`}>
            <Heading fontSize='xl'>{preview.title}</Heading>
          </Link>
        </Box>
        <Text mt={2}>{preview.description}</Text>
        <Flex align='center' mt='4'>
          <Link href={`/${preview.author.username}/${preview.slug}`}>
            <Text fontSize='s'>Read more...</Text>
          </Link>
        </Flex>
        <ArticleAction article={preview} setPreview={setPreview} />
      </Box>
    </Flex>
  );
};
