import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

interface NavBarSearchProps {
  show: boolean;
}

export const NavBarSearch: React.FC<NavBarSearchProps> = ({ show }) => {
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
    <Flex
      display={[show ? 'block' : 'none', show ? 'flex' : 'none', 'flex']}
      width={['100%', '75%', 'auto']}
      alignItems='center'
      justify='center'
      flexGrow={1}
      mx={['0', '0', '10', '10']}
    >
      <InputGroup
        mt={[4, 4, 0]}
        w={['100%', '75%', '75%', '40%']}
        display='block'
      >
        <Input
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={() => submitSearch()}
          onKeyDown={handleKeyDown}
          ref={searchRef}
        />
        <InputRightElement>
          <IconButton
            size='sm'
            fontSize='lg'
            aria-label={'Search'}
            variant='ghost'
            color='current'
            mx='2'
            icon={'search'}
            onClick={() => submitSearch()}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
