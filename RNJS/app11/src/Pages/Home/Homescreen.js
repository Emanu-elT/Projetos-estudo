import React from "react";
import api from "../../services/api.js";
import AppLoading from 'expo-app-loading';
import { View, Text, Image } from "react-native";
import NewButton from "../../components/Button/NewButton.js";
import OutlineButton from "../../components/OutlineButton/OutlineButton.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

import styles from "./styles";

// This component will control our main page.
// When our app loads, the first page our user is going
// to see is returned from this component.
// It receives a prop, navigation, that can handle
// navigation between screens.
const Homescreen = ({ navigation }) => {

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log("Error while storing token: " + e);
    }
  }

  function tryConnection() {

    const headers = {
      'Content-Type': 'application/json',
    }

    api.post('api/auth/login', {
      "user": "iot",
      "password": "suasenhaaqui"
    }, {
      headers
    })
      .then(function (response) {
        console.log("Seu token:" + response.data["token"]);
        storeData('@storage_Key', response.data["token"]);
        navigation.navigate("Connect")
        console.log("Coneção bem sucedida" );
      })
      .catch(function (error) {
        console.log("Erro na autenticação\n" + error);
      });
  }

  // Wait until all the fonts are loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.containerPrincipal}>
        <View style={styles.containerContent}>
          {/* Main text content of Home page */}
          

          {/* 4 images icons which represents main focus of IOT apps */}
          <View style={styles.imagesIcons}>
            <Image
              style={{ width: 20, height: 34 }}
              source={require("../../../assets/icons/phone.png")}
            />
            <Image
              style={{ width: 82, height: 64 }}
              source={require("../../../assets/icons/home.png")}
            />
            <Image
              style={{ width: 27, height: 33 }}
              source={require("../../../assets/icons/security.png")}
            />
            </View>
            <View style={styles.textContent}>
            <Text style={styles.pageTitle}>SMART</Text>
            <Text style={styles.pageSubTitle}>Vaso inteligente</Text>
            </View>
          
        </View>

        {/* Container that holds the two main buttons */}
        <View style={styles.containerButtons}>
          {/* When pressed, this first button sends the user 
          to "Connected" component/page */}
          <NewButton
            bgColor={"#228b22"}
            width={120}
            height={90}
            bRadius={10}
            title="CONNECT"
            txtColor="white"
            txtSize={17}
            marginTop={"25%"}
            onPress={tryConnection}
          />
          {/* When pressed, this second button sends the user 
          to "About" component/page */}
          
          <OutlineButton
            title="Access"
            onPress={() => navigation.navigate('Connect')}
          />
        </View>
      </View>
    );
  }
};

export default Homescreen;
