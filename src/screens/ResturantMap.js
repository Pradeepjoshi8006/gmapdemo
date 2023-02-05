import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, PermissionsAndroid, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {TEXTCONST} from '../utils/Constant';

const {width, height} = Dimensions.get('window');

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: TEXTCONST.Geolocation_Permission,
        message: TEXTCONST.Can_we_access_your_location,
        buttonNeutral: TEXTCONST.Ask_Me_Later,
        buttonNegative: TEXTCONST.Cancel,
        buttonPositive: TEXTCONST.ok,
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

function ResturantMap({route}) {
  const [location, setLocation] = useState(false);
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const mapRef = useRef(null);
  const mapView = '';
  const GOOGLE_MAPS_APIKEY = '';

  useEffect(() => {
    getLocation();
  });

  useEffect(() => {
    goToLocation();
  });

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  const goToLocation = () => {
    mapRef.current.animateToRegion(ResturentRegion, 3 * 1000);
  };

  const ResturentRegion = {
    latitude: route?.params?.latitude,
    longitude: route?.params?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const origin = {
    latitude: location?.coords?.latitude,
    longitude: location?.coords?.longitude,
  };

  const destination = {
    latitude: route?.params?.latitude,
    longitude: route?.params?.longitude,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={reg => setRegion(reg)}
      />
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="pink"
        optimizeWaypoints={true}
        onReady={result => {
          console.log(`Distance: ${result.distance} km`);
          console.log(`Duration: ${result.duration} min.`);

          mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: width / 20,
              bottom: height / 20,
              left: width / 20,
              top: height / 20,
            },
          });
        }}
        onError={errorMessage => {
          console.log(errorMessage);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 20,
    backgroundColor: 'lightblue',
  },
});

export default ResturantMap;
