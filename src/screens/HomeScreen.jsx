import { useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setOrigin, setDestination, selectOrigin } from "../redux/slices/navSlice";

const HomeScreen = () => {
  
    const dispatch = useDispatch();
    return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <GooglePlacesAutocomplete
          placeholder="Where From?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: {
                flex: 0,
            },
            textInput: {
                fontSize: 18,
            }
          }}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details= null) => {
            dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description,
            }));
            dispatch(setDestination(null));
        }}
          query={{
            key: "AIzaSyCqnezG3TKUjGgmP6lVGr6cTpS1OhPMmm0",
            language: "en",
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
