import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import { auth, database } from '../../../firebaseConfig';
import { ref, getDownloadURL, putFile } from '@react-native-firebase/storage';
import { update } from '@react-native-firebase/database';
import { storage } from '../../../firebaseConfig';
import { styles } from './styles';

const defaultImageUrl = 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg';

const Profile = () => {
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userName, setUsername] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [renderImage, setRenderImage] = useState(null);

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
        setName(userData.name); 
      }
    });
  }, []);

  const onHandleUpdate = async (uid) => {
    try {
      const userRef = database.ref(`users/${uid}`);

      let imageUrl = userProfileImage; 

      if (selectedImage) {
        const { uri } = renderImage;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const storageRef = ref(storage, `users/${uid}/${filename}`);
        await putFile(storageRef, uploadUri);
        imageUrl = await getDownloadURL(storageRef);
      }

      const userData = {
        name: name,
        profileImage: imageUrl,
      };

      await update(userRef, userData);
      console.log('Perfil atualizado com sucesso!');
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      alert('Erro ao atualizar perfil', err.message);
    }
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'profileImages',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Escolha de imagem cancelada');
      } else if (response.error) {
        console.error('Erro ao escolher imagem: ', response.error);
      } else {
        const source = response.assets[0].uri;
        const teste = { uri: response.assets[0].uri };
        setSelectedImage(source);
        setRenderImage(teste);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImageUpload}>
        {selectedImage||userProfileImage ? (
          <Image source={{ uri: selectedImage || userProfileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../../assets/logo.png')} style={styles.profileImage} />
          )}
        </TouchableOpacity>
        <Text style={styles.textProfileName}>{userName}</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          autoCapitalize="none"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      <Icon name="edit" color={'black'} size={23} style={styles.inputIcon} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onHandleUpdate(auth.currentUser.uid)}>
        <Text style={styles.textButton}>Atualizar perfil</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Profile;
