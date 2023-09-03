import { View } from "react-native";
import React from "react";
import {
  Divider,
  HStack,
  Heading,
  ScrollView,
  VStack,
  Text,
} from "native-base";

const AboutScreen = () => {
  return (
    <ScrollView p={6} flex={1}>
      <View style={{ paddingBottom: 80 }}>
        <Heading color="gray.500">About the App</Heading>
        <Divider my={5} />
        <Text>About MemeGen</Text>
        <VStack>
          <HStack space={2}>
            <Text>Version:</Text>
            <Text>1.0.0</Text>
          </HStack>
          <HStack space={2}>
            <Text>Developer:</Text>
            <Text>[Your Name]</Text>
          </HStack>
          <HStack space={2}>
            <Text>Contact:</Text>
            <Text>[Your Email Address]</Text>
          </HStack>
        </VStack>
        <Divider my={4} />
        <Heading fontSize="md" color="gray.500">
          Description
        </Heading>
        <Text>
          MemeGen is your ultimate destination for creating and enjoying memes
          on your mobile device. Whether you're a meme enthusiast or just
          looking for some humor, MemeGen has you covered.
        </Text>
        <Divider my={4} />
        <Heading fontSize="md" color="gray.500">
          Features
        </Heading>
        <VStack>
          <Text>
            - Meme Generator: Create your own memes with ease. Add witty
            captions to popular meme templates and share them with your friends.
          </Text>
          <Text>
            - Trending Memes: Stay up-to-date with the latest and most hilarious
            memes from Reddit. Laugh out loud and discover new favorites.
          </Text>
          <Text>
            - Save Your Favorites: Keep a collection of your favorite memes.
            Never lose track of the ones that made you laugh the most.
          </Text>
        </VStack>
        <Divider my={4} />
        <Heading fontSize="md" color="gray.500">
          Feedback
        </Heading>
        <Text>
          We're constantly working to improve MemeGen and provide you with the
          best meme-making and meme-viewing experience. If you have any
          suggestions, feedback, or encounter any issues, please feel free to
          reach out to us at [Your Email Address].
        </Text>
        <Divider my={4} />
        <Heading fontSize="md" color="gray.500">
          Privacy Policy
        </Heading>
        <Text>
          At MemeGen, we take your privacy seriously. We do not collect or store
          any personal information without your consent. For more information,
          please read our [Privacy Policy]
        </Text>
        <Divider my={4} />
        <Heading fontSize="md" color="gray.500">
          Terms of Service
        </Heading>
        <Text>
          By using MemeGen, you agree to our [Terms of Service] Please review
          these terms to understand how you can use our app.{" "}
        </Text>
        <Divider my={4} />
        <Heading fontSize="md" color="gray.500">
          Credits
        </Heading>
        <Text>
          MemeGen is made possible by the contributions of various meme
          creators, the Reddit community, and the open-source software
          community. We appreciate your creativity and support.
        </Text>
        <Divider my={4} />
        <Heading fontSize="md" color="gray.500">
          Acknowledgments
        </Heading>
        <Text>
          We acknowledge the usage of certain third-party libraries and
          resources in the development of MemeGen. These resources are credited
          and comply with their respective licenses. Thank you for choosing
          MemeGen for your meme-making and meme-viewing needs. Enjoy the
          laughter!
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
