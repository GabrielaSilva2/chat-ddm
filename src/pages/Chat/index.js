import React from 'react';
import { View, StyleSheet } from 'react-native';
import Chat from '../../components/Chat'
import { useRoute } from '@react-navigation/native';


const ChatScreen = () => {
  return (
    <View style={styles.container}>
        <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
});

export default ChatScreen;