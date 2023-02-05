import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Icons} from '../utils/ImageConst';

const Ratings = ({resturantRating}) => {
  let stars = [];
  for (var i = 1; i <= 5; i++) {
    let path = Icons.starFill;
    if (i > resturantRating) {
      path = Icons.startEmpty;
    }
    stars.push(<Image style={styles.image} source={path} />);
  }
  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    height: 20,
    width: 20,
  },
});

export default Ratings;
