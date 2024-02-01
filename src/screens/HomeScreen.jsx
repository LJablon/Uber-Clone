import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import {
  setOrigin,
  setDestination,
  selectOriginAddress,
  setOriginAddress,
} from "../redux/slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import * as Location from "expo-location";

const HomeScreen = () => {
  const ref = useRef();
  const originAddress = useSelector(selectOriginAddress);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    ref.current?.setAddressText(originAddress);
    dispatch(setOriginAddress(originAddress));
  }, [originAddress]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLat(parseFloat(location.coords.latitude));
      setLng(parseFloat(location.coords.longitude));
    })();
  }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  // console.log(location);
  // console.log()
  // console.log(parseFloat(location?.coords["longitude"]))

  console.log(lat);
  console.log(lng);
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
          ref={ref}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}

          // TODO: Current location 
          // predefinedPlaces={[
          //   {
          //     description: "Current Location",
          //     geometry: { location: { lat: lat, lng: lng } },
          //   },
          // ]}
          query={{
            key: "AIzaSyCqnezG3TKUjGgmP6lVGr6cTpS1OhPMmm0",
            language: "en",
          }}
        />
        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
