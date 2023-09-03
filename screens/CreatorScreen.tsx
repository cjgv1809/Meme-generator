import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import React, { useState, useEffect } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { memes } from "../assets/list";
import {
  Center,
  HStack,
  Heading,
  ScrollView,
  VStack,
  Image,
  FormControl,
  Input,
  Button,
  Spinner,
  Modal,
  useToast,
} from "native-base";
import MemeSelector from "../components/MemeSelector";
import useApi from "../hooks/useApi";

// Define a type for valid meme names
type MemeName = keyof typeof memes;

type Props = {
  navigation?: NavigationProp<any, any>;
  route?: RouteProp<{ params: { meme: MemeName } }, "params">;
};

const CreatorScreen = ({ route, navigation }: Props) => {
  const { createMeme } = useApi();
  const [selected, setSelected] = useState<unknown>();
  const [selectedName, setSelectedName] = useState<MemeName>("10-Guy");
  const [top, setTop] = useState<string>("");
  const [bottom, setBottom] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const { meme } = route!.params || { meme: "10-Guy" };
    setSelected(memes[meme]);
    setSelectedName(meme);
  }, [route]);

  const memeSelected = (meme: Meme) => {
    setSelected(meme.image);
    setSelectedName(meme.name as MemeName);
  };

  const doCreateMeme = async () => {
    setLoading(true);

    const memeBlob = await createMeme(top, bottom, selectedName);
    setLoading(false);

    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(memeBlob.data);
    fileReaderInstance.onload = async () => {
      const base64data = fileReaderInstance.result as string;
      // Convert data URI to image file
      const fileUri = FileSystem.cacheDirectory + "meme.jpg";
      await FileSystem.writeAsStringAsync(fileUri, base64data!.split(",")[1], {
        encoding: FileSystem.EncodingType.Base64,
      });

      setResult(fileUri);
      console.log("RESULT", fileUri);
      setShowModal(true);
    };
  };

  const downloadImage = async () => {
    if (!result) {
      console.error("Invalid meme image URI");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      try {
        await MediaLibrary.saveToLibraryAsync(result);
        setShowModal(false);
        setTop("");
        setBottom("");

        toast.show({
          title: "Downloaded",
          description: "Meme saved to gallery",
          placement: "bottom",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error saving meme to gallery:", error);
        toast.show({
          title: "Error",
          description: "Error saving meme to gallery",
          placement: "bottom",
          duration: 3000,
        });
      }
    } else {
      console.error("Permission to access media library not granted");
      toast.show({
        title: "Error",
        description: "Permission to access media library not granted",
        placement: "bottom",
        duration: 3000,
      });
    }
  };

  return (
    <ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Your Meme</Modal.Header>
          <Modal.Body>
            <Image
              source={{ uri: result as any }}
              alt="Meme"
              resizeMode="contain"
              size="lg"
              alignSelf="center"
              borderRadius={8}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="md"
              flex={1}
              colorScheme="secondary"
              bg="secondary.500"
              onPress={() => downloadImage()}
            >
              <Heading fontSize="md" color="white">
                Download
              </Heading>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {loading && (
        <HStack my={8} space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading meme" color="secondary.600" />
          <Heading color="secondary.600" fontSize="md">
            Creating meme...
          </Heading>
        </HStack>
      )}

      {!loading && selected && (
        <HStack
          justifyContent="center"
          alignContent="center"
          space={4}
          w="100%"
        >
          <VStack space={2} w="100%" maxWidth={40} my={6}>
            <FormControl>
              <FormControl.Label>Top Text</FormControl.Label>
              <Input
                focusOutlineColor={"secondary.500"}
                bgColor={"secondary.50"}
                cursorColor="#000"
                value={top}
                onChangeText={(text) => setTop(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Bottom Text</FormControl.Label>
              <Input
                focusOutlineColor={"secondary.500"}
                bgColor={"secondary.50"}
                cursorColor="#000"
                value={bottom}
                onChangeText={(text) => setBottom(text)}
              />
            </FormControl>
            <Button
              colorScheme="secondary"
              onPress={() => doCreateMeme()}
              size="md"
              mt={4}
            >
              <Heading fontSize="md" color="white">
                Create Meme
              </Heading>
            </Button>
          </VStack>
          <Center maxWidth={40}>
            <Image
              key={selected as string}
              source={selected}
              alt={selectedName}
              resizeMode="contain"
              size="lg"
              borderRadius={8}
            />
          </Center>
        </HStack>
      )}

      <MemeSelector
        onSelect={(meme) => memeSelected(meme)}
        activeMeme={selectedName}
      />
    </ScrollView>
  );
};

export default CreatorScreen;
