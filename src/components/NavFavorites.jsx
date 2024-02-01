import { useDispatch } from "react-redux";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import {
  setDestinationAddress,
  setOriginAddress,
} from "../redux/slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    destination: "996 Coast View Drive",
  },
  {
    id: "3",
    icon: "school",
    location: "School",
    destination: "500 El Camino Real",
  },
  {
    id: "2",
    icon: "briefcase",
    location: "Work",
    destination: "6110 Stoneridge Mall Rd",
  },
];

const NavFavorites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => {
            if (navigation.getState().routeNames[0] === "HomeScreen")
              dispatch(setOriginAddress(destination));
            else dispatch(setDestinationAddress(destination));
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
