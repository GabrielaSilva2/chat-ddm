import React from 'react';
import { View, StyleSheet } from 'react-native';
import Contacts from '../../components/Contacts';

const ContactsScreen = () => {

  return (
    <View style={styles.container}>
      <Contacts />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ContactsScreen;
