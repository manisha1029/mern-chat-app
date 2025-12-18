import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { registerUser } from "@/services/auth/auth";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File | null;
}

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();

  // State variables.
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  async function handleImageUpload(file: File) {
    setLoading(true);
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mern-chat-app");
      data.append("cloud_name", "dzvcrrgtz");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzvcrrgtz/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const result = await response.json();
        setUserData((prev) => ({ ...prev, avatar: result.secure_url }));
      } catch (error) {
        console.error("Failed to upload image", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Please select a JPEG or PNG image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    const pic = files?.[0];
    if (name === 'avatar') {
      if (!pic) {
        return toast({
          title: "Please select an image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
      }else {
        await handleImageUpload(pic);
      }
    }
    setUserData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  }

  async function submitHandler() {
    const { name, email, password, confirmPassword } = userData;
    if (!name || !email || !password || !confirmPassword) {
     return toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    if (password !== confirmPassword) {
     return toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    try {
      setLoading(true);
      const response = await registerUser(userData);
      if(response){
        setLoading(false);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        navigate("/chats");
      }
    } catch (error: unknown) {
      const errMsg = error as string;
      setLoading(false);
      toast({
        title: errMsg || "Failed to sign up",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      console.error("Failed to sign up", error);
    }
    console.log(userData);
  }

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter you name"
          onChange={handleInputChange}
          value={userData.name}
          name="name"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={handleInputChange}
          value={userData.email}
          name="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem" >
            <Button size="sm" h="1.75rem" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              h="1.75rem"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="avatar">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          name="avatar"
          p={1.5}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        onClick={submitHandler}
        mt={4}
        width="100%"
        isLoading={loading}
      >
        Sign up
      </Button>
    </VStack>
  );
}

export default Signup;
