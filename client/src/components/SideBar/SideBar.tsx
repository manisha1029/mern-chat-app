import { useNavigate } from 'react-router-dom';
import { BellIcon } from '@chakra-ui/icons'
import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuItem, MenuDivider, MenuList, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Input, DrawerHeader } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";

import { useChat } from '@/context/chatContext'
import ProfileModal from '../Miscellaneous/ProfileModal';
import { useMemo, useState } from 'react';
import { getWithAuth } from '@/services/makeRequest';

function SideBar() {
    const { user, setUser } = useChat();
    const toast = useToast();
    // States.
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    console.log("Sidebar user:", user);
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem('userInfo');
        setUser(null);
        console.log('Logged out', user);
        navigate('/');
    }

    function onClose() {
        setIsOpen(false);
    }

   async function handleSearch() {
        if (!search) {
            return toast({
                title: "Please enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
        }
        const response = await getWithAuth(`/chat/user?search=${search}`, user?.token || '');
        console.log("Search results:", response);
    }

    const profileMenuItem = useMemo(() => (
        <MenuItem>My Profile</MenuItem>
    ), []);

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
                <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
                    <Button variant="ghost" onClick={() => setIsOpen(true)}>
                        <i className='fas fa-search' />
                        <Text display={{ base: 'none', md: 'flex' }} px={2}>Search User</Text>
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
                        <MenuButton as={Button} rightIcon={<i className='fas fa-caret-down' />} p={1} m={1}>
                            <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                {profileMenuItem}
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent borderBottomWidth="1px">
                    <DrawerHeader>Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideBar