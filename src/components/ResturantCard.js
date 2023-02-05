import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Ratings from '../components/Ratings';
import {Icons} from '../utils/ImageConst';

const ResturantCard = ({resturant, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Map', {
          latitude: resturant?.latitude,
          longitude: resturant?.longitude,
        })
      }>
      <Image
        defaultSource={require('../asset/img.png')}
        source={require('../asset/img.png')}
        style={styles.image}
      />
      <View style={{flexDirection: 'column'}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{resturant?.title}</Text>
          <Ratings resturantRating={resturant?.rating} />
        </View>
      </View>
      <View style={styles.mapView}>
        <Image
          defaultSource={Icons.shopPin}
          source={Icons.map}
          style={styles.imageMap}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: 120,
    height: 70,
    borderRadius: 10,
  },
  imageMap: {
    width: 22,
    height: 30,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexWrap: 'wrap',
    margin: 5,
  },
  mapView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'green',
    marginVertical: 10,
  },
});
export default ResturantCard;
