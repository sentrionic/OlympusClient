import React from 'react';
import { mutate } from 'swr';
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

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
    <Box
      display={['block', 'flex']}
      justifyContent={['center', 'space-between']}
    >
      <Flex justify='center' display={['flex', 'none']}>
        <Avatar size='2xl' name={profile.username} src={profile.image} />
      </Flex>
      <Box mt={{ base: 4, md: 0 }}>
        <Flex align='center' direction={['column', 'row']}>
          <Text fontWeight='bold' fontSize='3xl'>
            {profile.username}
          </Text>
          {user?.id === profile.id ? null : (
            <Button
              variant='outline'
              size='xs'
              rounded='true'
              ml={['0', '6']}
              onClick={() => toggleFollow(profile)}
            >
              {profile.following ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </Flex>
        <Text color='gray.500' mt={[2, 0]} textAlign={['center', 'start']}>
          {profile.bio}
        </Text>
        <Flex align='center' mt={[2, 0]} direction={['column', 'row']}>
          <Text fontSize='sm' color='gray.500' fontWeight='semibold'>
            {profile.followee} Following
          </Text>
          <Text
            fontSize='sm'
            color='gray.500'
            fontWeight='semibold'
            ml={['0', '5']}
          >
            {profile.followers} Followers
          </Text>
        </Flex>
      </Box>
      <Flex justify='center' display={['none', 'flex']}>
        <Avatar size='2xl' name={profile.username} src={profile.image} />
      </Flex>
    </Box>
  );
};
