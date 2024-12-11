import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { ref, set, once } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStateStore } from '../../../reducer';
import { database } from '../../../firebaseConfig';
import {styles} from './styles'

GoogleSignin.configure({
  webClientId: 'YOUR_PATH',
});

function RenderGoogleSignInButton() {
  const navigation = useNavigation();
  const setAuthState = userStateStore((state) => state.setAuthState);
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      const result = await auth().signInWithCredential(googleCredential);
      
      if (result.user) {
        const { displayName, photoURL, uid, email } = result.user;
        AsyncStorage.setItem('userUid', uid)
        if (!(displayName || photoURL)) {
          throw new Error('Missing information from Google Account.');
        }
  
        const userRef = database.ref(`users/${uid}`);
  
        // Verifique se o usuário já existe no banco de dados
        const snapshot = await userRef.once('value');
        if (!snapshot.exists()) {
          // Se o usuário não existe, crie um novo registro
          const userData = {
            name: displayName,
            profileImage: photoURL,
            email: email,
          };
          await set(userRef, userData);
        }
  
        console.log('Login realizado com sucesso!');
        Alert.alert('Login realizado com sucesso!');
        await setAuthState(true);
        navigation.navigate('MainTabNavigator');
        
      }
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
      Alert.alert('Erro ao fazer login com o Google', error.message);
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
      <Icon name="google" size={20} color="black" />
    </TouchableOpacity>
  );
}

export default RenderGoogleSignInButton;
