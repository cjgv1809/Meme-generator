import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Skeleton,
  VStack,
  useTheme,
} from "native-base";
import Swiper from "react-native-swiper";
import { View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import MemeSelector from "../components/MemeSelector";

type Props = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({ navigation }: Props) => {
  const { getTrending } = useApi();
  const theme = useTheme();
  const [memes, setMemes] = useState<TrendingMeme[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrending = async () => {
      const results = await getTrending();
      setMemes(results);
      setLoading(false);
    };

    fetchTrending();
  }, []);

  const memeSelected = (meme: Meme) => {
    navigation.navigate("Creator", { meme: meme.name });
  };

  return (
    <ScrollView bgColor="secondary.50" style={{ paddingBottom: 80 }}>
      {loading && (
        <Center w="100%" mt={8}>
          <VStack w="90%" space={4}>
            <Skeleton.Text px={2} />
            <Skeleton h="80" />
          </VStack>
        </Center>
      )}

      {!loading && (
        <>
          <Swiper
            style={{ height: 350 }}
            loop={false}
            showsButtons={true}
            showsPagination={false}
            nextButton={
              <Heading
                color={theme.colors.secondary[900]}
                fontSize={theme.fontSizes["3xl"]}
              >
                ›
              </Heading>
            }
            prevButton={
              <Heading
                color={theme.colors.secondary[900]}
                fontSize={theme.fontSizes["3xl"]}
              >
                ‹
              </Heading>
            }
          >
            {memes?.map((meme: TrendingMeme, index: number) => (
              <View key={index.toString()}>
                <VStack display="flex" alignItems="center" p={8}>
                  <Heading my={2} color="gray.500">
                    {meme.title}
                  </Heading>
                  <Image
                    source={{ uri: meme.url }}
                    alt={meme.title}
                    resizeMode="contain"
                    h="80%"
                    w="100%"
                  />
                </VStack>
              </View>
            ))}
          </Swiper>
          <Center m={4}>
            <MemeSelector onSelect={(meme: Meme) => memeSelected(meme)} />
          </Center>
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
