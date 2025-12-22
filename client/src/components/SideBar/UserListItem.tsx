import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import type { User } from "@/services/chats/chats";

interface UserListItemProps {
  user: User;
  handleFunction: () => void;
}

function UserListItem({ user, handleFunction }: UserListItemProps) {
  const { name, email, avatar } = user;

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={name} src={avatar} />
      <Box>
        <Text>{name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {email}
        </Text>
      </Box>
    </Box>
  );
}

export default React.memo(UserListItem);
