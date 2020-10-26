import React from 'react';
import { mutate } from 'swr';
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/core';

import { ProfileResponse } from '../../api/models';
import { followUser, unfollowUser } from '../../api';
import { useGetCurrentUser } from '../../api/useGetCurrentUser';

type ProfileBoxProps = {
  profile: ProfileResponse;
};

export const ProfileBox: React.FC<ProfileBoxProps> = ({ profile }) => {
  const { user } = useGetCurrentUser();

  const toggleFollow = (profile: ProfileResponse) => {
    mutate(
      `/profiles/${profile.username}`,
      {
        ...profile,
        following: !profile.following,
      },
      false
    );
    if (profile.following) {
      unfollowUser(profile.username);
    } else {
      followUser(profile.username);
    }
  };

  return (
    <Box display={{ md: 'flex' }} justifyContent="space-between">
      <Box mt={{ base: 4, md: 0 }}>
        <Flex align="center">
          <Text fontWeight="bold" fontSize="3xl">
            {profile.username}
          </Text>
          {user?.id === profile.id ? null : (
            <Button
              variant="outline"
              size="xs"
              rounded="true"
              ml="6"
              onClick={() => toggleFollow(profile)}
            >
              {profile.following ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </Flex>
        <Text color="gray.500">{profile.bio}</Text>
        <Flex align="center">
          <Text fontSize="sm" color="gray.500" fontWeight="semibold">
            {profile.followee} Following
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="semibold" ml="5">
            {profile.followers} Followers
          </Text>
        </Flex>
      </Box>
      <Avatar size="2xl" name={profile.username} src={profile.image} />
    </Box>
  );
};
