import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';

const HomePage = () => (
  <View style={styles.home}>
    <Icon name="weight-lifter" size={100} color={Colors['light'].icon} />
    <Text style={styles.homeText}>Personal Fitness App</Text>
  </View>
);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors['light'].background,
  },
  homeText: {
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 40,
    color: Colors['light'].text,
    fontWeight: "bold",
  },
});

export default HomePage;
