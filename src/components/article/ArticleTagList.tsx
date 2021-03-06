import { Badge, Box, Flex, Link } from '@chakra-ui/react';
import React from 'react';

interface ArticleTagListProps {
  tagList: string[];
}

export const ArticleTagList: React.FC<ArticleTagListProps> = ({ tagList }) => {
  return (
    <Flex mt="5">
      {tagList.map((t) => (
        <Box key={t} _hover={{ cursor: 'pointer' }} mr="4">
          <Link href={`/search?tag=${t}`}>
            <Badge p="2" rounded="md">
              {t}
            </Badge>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};
