import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { mutate } from 'swr';
import { deleteArticle } from '../../api';
import { ArticleResponse } from '../../api/models';
import { ChevronDownIcon } from "@chakra-ui/icons";

interface ArticleMenuProps {
  article: ArticleResponse;
}

export const ArticleMenu: React.FC<ArticleMenuProps> = ({ article }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const cancelRef = React.useRef();

  const onClose = async () => {
    setIsOpen(false);
    const { data } = await deleteArticle(article.slug);
    if (data) {
      mutate('/articles');
      await router.push('/');
    }
  };

  const pushEditArticle = async () => {
    await router.push(`/${article.author.username}/${article.slug}/edit`);
  };

  return (
    <>
      <Menu>
        <IconButton
          as={MenuButton}
          variant='outline'
          aria-label='Settings Menu'
          icon={<ChevronDownIcon />}
          size='sm'
        />
        <MenuList>
          <MenuItem onClick={() => pushEditArticle()}>Edit</MenuItem>
          <MenuItem onClick={() => setIsOpen(true)}>Delete</MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Article
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onClose} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
