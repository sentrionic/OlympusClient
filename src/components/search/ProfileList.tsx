import { Avatar, Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { ProfileResponse } from '../../api/models';

interface ProfileListItemProps {
  profile: ProfileResponse;
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({ profile }) => {
  return (
    <Stack isInline>
      <Avatar name={profile.username} src={profile.image} size="lg" />
      <Box>
        <Link href={`/${profile.username}`}>
          <Heading as="h3" size="md">
            {profile.username}
          </Heading>
        </Link>
        <Text mt="1" color="gray.700">
          {profile.bio}
        </Text>
      </Box>
    </Stack>
  );
};
