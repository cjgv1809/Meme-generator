import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import { NativeBaseProvider, extendTheme } from "native-base";
import CreatorScreen from "./screens/CreatorScreen";
import AboutScreen from "./screens/AboutScreen";
import CustomDrawerContent from "./components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

const theme = extendTheme({});

export default function App() {
  const headerStyle = {
    headerStyle: { backgroundColor: theme.colors.secondary[600] },
    headerTintColor: theme.colors.secondary[50],
  };

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={({ state, navigation, descriptors }) => (
            <CustomDrawerContent
              state={state}
              navigation={navigation}
              descriptors={descriptors}
            />
          )}
          initialRouteName="Home"
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Trending Memes",
              ...headerStyle,
            }}
          />
          <Drawer.Screen
            name="Creator"
            component={CreatorScreen}
            options={{
              title: "Meme Generator",
              ...headerStyle,
            }}
          />
          <Drawer.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: "About the App",
              ...headerStyle,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>

      <StatusBar style="light" animated={true} />
    </NativeBaseProvider>
  );
}
