import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

interface NavBarSearchProps {}

export const NavBarSearch: React.FC<NavBarSearchProps> = ({}) => {
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchRef.current === document.activeElement) {
      submitSearch();
    }
  };

  const submitSearch = async () => {
    await router.push({
      pathname: 'search',
      query: { article: search },
    });
  };

  return (
    <InputGroup w={'25%'} mx={10}>
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={() => submitSearch()}
        onKeyDown={handleKeyDown}
        ref={searchRef}
      />
      <InputRightElement>
        <IconButton
          size="sm"
          fontSize="lg"
          aria-label={'Search'}
          variant="ghost"
          color="current"
          mx="2"
          icon={'search'}
          onClick={() => submitSearch()}
        />
      </InputRightElement>
    </InputGroup>
  );
};
