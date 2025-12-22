import { useNavigate } from "react-router-dom";
import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuDivider,
  MenuList,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Input,
  DrawerHeader,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useChat } from "@/context/chatContext";
import useDebounce from "@/hook/useDebounce";
import ProfileModal from "../Miscellaneous/ProfileModal";
import { useEffect, useMemo, useState } from "react";
import { accessChat, searchUsers, type User } from "@/services/chats/chats";
import { ChatLoadingSkeleton } from "../Miscellaneous/ChatLoadingSkeleton";
import UserListItem from "./UserListItem";

function SideBar() {
  const { user, setUser } = useChat();
  //   const toast = useToast();

  // States.
  const [isOpen, setIsOpen] = useState(false);
  const [searchChat, setSearchChat] = useState("");
  const [searchList, setSearchList] = useState<User[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  // Debounce hook.
  const debouncedSearch = useDebounce(searchChat, 500);

  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("userInfo");
    setUser(null);
    console.log("Logged out", user);
    navigate("/");
  }

  function onClose() {
    setIsOpen(false);
  }

  async function handleSearch(query: string) {
    if (!query.trim()) {
      setSearchList([]);
      return;
    }
    try {
      setChatLoading(true);
      const response = await searchUsers(query, user?.token || "");
      console.log("Search results:", response);
      setSearchList(response || []);
    } catch (error) {
      console.log("error while searching user", error);
    } finally {
      setChatLoading(false);
    }
  }
  useEffect(() => {
    if (!isOpen) return;
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  function onAccessChat(userId:string) {
    const chatsResponse = accessChat(userId, user?.token || "")
  }

  function renderUserList() {
    return searchList?.length > 0 ? (
      searchList?.map((user) => (
        <UserListItem
          key={user?._id}
          user={user}
          handleFunction={()=>onAccessChat(user?._id)}
        />
      ))
    ) : (
      <Box>No Chats Found</Box>
    );
  }

  const profileMenuItem = useMemo(() => <MenuItem>My Profile</MenuItem>, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        width="100%"
        padding="10px"
        borderRight="1px solid lightgray"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={() => setIsOpen(true)}>
            <i className="fas fa-search" />
            <Text display={{ base: "none", md: "flex" }} px={2}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1} fontSize="2xl" m={1}>
              <BellIcon />
            </MenuButton>
            {/* Menulist */}
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<i className="fas fa-caret-down" />}
              p={1}
              m={1}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>{profileMenuItem}</ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderBottomWidth="1px">
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={searchChat}
                onChange={(e) => setSearchChat(e.target.value)}
              />
            </Box>
            <Box marginTop={6}>
              {chatLoading ? <ChatLoadingSkeleton /> : renderUserList()}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideBar;
