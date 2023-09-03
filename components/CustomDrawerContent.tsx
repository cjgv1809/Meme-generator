import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Text,
  VStack,
  Pressable,
  HStack,
  Icon,
  Heading,
  useTheme,
} from "native-base";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getIcon from "../utils/getIcon";

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

const CustomDrawerContent = ({ state, navigation, descriptors }: Props) => {
  const theme = useTheme();
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        backgroundColor: theme.colors.coolGray[100],
        flex: 1,
      }}
    >
      <Heading px={10} py={4} color="secondary.800">
        MemeGen
      </Heading>
      <VStack my={4}>
        {state?.routeNames?.map((route: string, index: number) => (
          <Pressable
            key={route}
            onPress={() => {
              navigation.navigate(route);
            }}
            bg={state.index === index ? "secondary.200" : "transparent"}
            rounded="md"
            px={6}
            py={2}
          >
            <HStack display="flex" alignItems="center" p={4}>
              <Icon
                size="md"
                mr={4}
                color={state.index === index ? "secondary.500" : "gray.700"}
                as={<MaterialCommunityIcons name={getIcon(route)} />}
              />
              <Text
                fontSize={16}
                fontWeight={state.index === index ? 700 : 400}
                color={state.index === index ? "secondary.500" : "gray.700"}
              >
                {route}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
