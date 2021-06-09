import { Flex, Input, Select } from '@chakra-ui/react';
import React from 'react';

interface SearchInputProps {
  search: string;
  setSearch: Function;
  setOrder: Function;
}

export const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch, setOrder }) => {
  return (
    <Flex>
      <Input
        variant="flushed"
        focusBorderColor="black"
        placeholder="Search OlympusBlog"
        size="lg"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <Select
        defaultValue="DESC"
        variant="flushed"
        focusBorderColor="black"
        size="lg"
        mb="auto"
        w="150px"
        ml="4"
        onChange={(option) => setOrder(option.target.value)}
      >
        <option value="DESC">Newest</option>
        <option value="ASC">Oldest</option>
        <option value="TOP">Top</option>
      </Select>
    </Flex>
  );
};
