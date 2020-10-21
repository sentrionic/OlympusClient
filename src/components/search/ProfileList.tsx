import { Avatar, Box, Heading, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import { ProfileResponse } from '../../api/models';

interface ProfileListItemProps {
  profile: ProfileResponse;
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  profile,
}) => {
  return (
    <Stack isInline>
      <Avatar name={profile.username} src={profile.image} size="lg" />
      <Box>
        <NextLink href={'/[username]'} as={`/${profile.username}`}>
          <Link>
            <Heading as="h3" size="md">
              {profile.username}
            </Heading>
          </Link>
        </NextLink>
        <Text mt="1" color="gray.700">
          {profile.bio}
        </Text>
      </Box>
    </Stack>
  );
};
