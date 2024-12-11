import React from 'react';
import { View, StyleSheet } from 'react-native';
import Config from '../../components/Config';

const ConfigScreen = () => {

  return (
    <View style={styles.container}>
      <Config />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConfigScreen;
