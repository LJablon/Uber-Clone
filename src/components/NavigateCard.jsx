import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TextInput } from "react-native-web";
import { setDestination } from "../redux/slices/navSlice";
import {useNavigation} from "@react-navigation/native"
import NavFavorites from "./NavFavorites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Lucas</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where To?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: "AIzaSyCqnezG3TKUjGgmP6lVGr6cTpS1OhPMmm0",
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            styles={styles}
          />
        </View>
        <NavFavorites/>
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
          onPress={() => {navigation.navigate("RideOptionsCard")}}
        >
          <Icon name="car" type="font-awesome" color="white" size={16}/>
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}>
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16}/>
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 7,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
