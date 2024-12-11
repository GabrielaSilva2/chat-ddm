import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '@react-native-firebase/auth';
import { auth, database } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../../AuthContext';
import {userStateStore} from '../../../reducer';
import { styles } from './styles';

const Config = () => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userName, setUsername] = useState('');
  const navigation = useNavigation();
  const setAuthState = userStateStore((state) => state.setAuthState);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    if (!uid) {
      console.error('UID do usuário não encontrado.');
      return;
    }

    const userRef = database.ref(`users/${uid}`);

    userRef.on('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.profileImage && userData.name) {
        setUserProfileImage(userData.profileImage);
        setUsername(userData.name);
      }
    });
  }, []);

  const handleLogout = async () => {
    if (confirmLogout) {
      try {
        await signOut(auth);
        await setAuthState(false);
        navigation.navigate('Register');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    } else {
      Alert.alert(
        'Sair da Conta',
        'Tem certeza de que deseja sair da sua conta?',
        [
          {
            text: 'Cancelar',
            onPress: () => setConfirmLogout(false),
            style: 'cancel',
          },
          {
            text: 'Sair',
            onPress: () => setConfirmLogout(true),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Configurações da Conta</Text>
      </View>
      <View style={styles.profileContainer}>
        {userProfileImage && (
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
        )}
        <Text style={styles.profileName}>{userName}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        <Icon name="exit-to-app" size={36} color="#1B0A3E" />
      </TouchableOpacity>
    </View>
  );
};

export default Config;
