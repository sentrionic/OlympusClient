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
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { mutate } from 'swr';
import { deleteComment } from '../../api';

interface CommentMenuProps {
  slug: string;
  id: number;
}

export const CommentMenu: React.FC<CommentMenuProps> = ({ slug, id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const cancelRef = React.useRef();

  const onConfirm = async () => {
    setIsOpen(false);
    const { data } = await deleteComment(slug, id);
    if (data) {
      mutate(`articles/${slug}/comments`);
    }
  };

  return (
    <>
      <Menu>
        <IconButton
          as={MenuButton}
          variant='outline'
          aria-label='Settings Menu'
          icon='chevron-down'
          size='sm'
        />
        <MenuList>
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
            Delete Comment
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variantColor='red' onClick={() => onConfirm()} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};