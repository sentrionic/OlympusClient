import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/core';
import { AiOutlineGithub, AiOutlineInfoCircle } from 'react-icons/ai';
import { IconType } from 'react-icons';

type FooterLinkProps = {
  icon?: IconType;
  href?: string;
  label?: string;
};

const FooterLink: React.FC<FooterLinkProps> = ({ icon, href, label }) => (
  <Link display='inline-block' href={href} aria-label={label} isExternal mx={2}>
    <Box as={icon} width='24px' height='24px' color='gray.400' />
  </Link>
);

const links = [
  {
    icon: AiOutlineGithub,
    label: 'GitHub',
    href: 'https://github.com/chakra-ui/chakra-ui',
  },
  {
    icon: AiOutlineInfoCircle,
    label: 'About',
    href: 'https://github.com/chakra-ui/chakra-ui',
  },
];

export const Footer: React.FC<FooterLinkProps> = ({}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      bottom={0}
      boxShadow='md'
      mt={12}
      justify='center'
      align='center'
      bg={isDark ? 'gray.800' : 'white'}
      borderTopWidth='1px'
      p={5}
      minW={430}
      as='footer'
    >
      <Box textAlign='center'>
        <Text fontSize='xl'>
          <span>OlympusBlog | 2020</span>
        </Text>
        <Stack mt={2} isInline justify='center'>
          {links.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};
