import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginWithEmail from '../../components/LoginWithEmail';

const LoginScreen = () => {
  

  return (
    <View style={styles.container}>
      <LoginWithEmail/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
