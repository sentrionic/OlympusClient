interface SearchProps {
  tabIndex: number;
  search: string;
  order: string;
}

export const getSearchUrl = ({ tabIndex, search, order }: SearchProps): string => {
  let url = null;

  if (search.length < 3) {
    url = null;
  } else {
    switch (tabIndex) {
      case 0: {
        url = `/articles?search=${search}&order=${order}`;
        break;
      }
      case 1: {
        url = `/profiles?search=${search}`;
        break;
      }
      case 2: {
        url = `/articles?tag=${search}&order=${order}`;
        break;
      }
      default: {
        break;
      }
    }
  }

  return url;
};
