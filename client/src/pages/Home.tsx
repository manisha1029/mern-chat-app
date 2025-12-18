import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";

function Home() {
  return (
    <Container maxW="xl" centerContent alignContent="center">
      <Box
        display="flex"
        justifyContent="center"
        bg="#ffffff"
        p={3}
        borderRadius="lg"
        width="100%"
      >
        <Text fontSize="4xl" fontWeight="500">
          Talk-A-Tive
        </Text>
      </Box>
      <Box width="100%" bg="#ffffff" p={3} borderRadius="lg" mt={4}>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;
