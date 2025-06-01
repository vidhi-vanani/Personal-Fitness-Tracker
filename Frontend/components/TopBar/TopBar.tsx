import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';

export default function TopBar() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Fitness Tracker</Text>
      <View style={styles.userIconContainer}>
        <Icon name="account-circle" size={32} color={Colors['light'].icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors['light'].backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors['light'].border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors['light'].text,
  },
  userIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
