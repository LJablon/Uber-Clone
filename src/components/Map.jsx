import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../redux/slices/navSlice";
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 200,
        right: 200,
        bottom: 200,
        left: 200,
      },
      animated: true,
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const url =
        "https://maps.googleapis.com/maps/api/distancematrix/json?" +
        "destinations=" +
        origin.description +
        "&origins=" +
        destination.description +
        "&units=imperial" +
        "&key=AIzaSyCqnezG3TKUjGgmP6lVGr6cTpS1OhPMmm0";
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, "AIzaSyCqnezG3TKUjGgmP6lVGr6cTpS1OhPMmm0"]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {/* Map Routing */}
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey="AIzaSyCqnezG3TKUjGgmP6lVGr6cTpS1OhPMmm0"
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {/* origin marker */}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
          pinColor="black"
        />
      )}

      {/* destination Marker */}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
          pinColor="black"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
