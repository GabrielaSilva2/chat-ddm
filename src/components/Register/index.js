import React, { useState } from 'react';
import {Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import {  storage } from '../../../firebaseConfig'; // Essa linha deve ser atualizada
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth'; // Import do Firebase Auth para o React Native
const backImage = require("../../assets/logo.png");
import { useNavigation } from '@react-navigation/native';
import { ref, getDownloadURL, putFile } from '@react-native-firebase/storage'; // Import do Firebase Storage para o React Native
import * as ImagePicker from 'react-native-image-picker';
import { set, getDatabase} from '@react-native-firebase/database';
import { styles } from './styles';


// Import do Firebase Realtime Database para o React Native
const auth = getAuth(); // Obtém uma instância de autenticação
const database = getDatabase();
const defaultImageUrl = 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [renderImage, setRenderImage] = useState(null)
  const navigation = useNavigation();
  const onHandleSignup = async () => {
    if (email !== '' && password !== '' && name !== '') {
      try {
        //console.log('chegou aqui')
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        //console.log('chegou no usercredential', userCredential)
        const user = userCredential.user;
        //console.log('chegou no user', user)
        const uid = user.uid;
        //console.log('userid', uid)
        const userRef = database.ref(`users/${uid}`);
        //console.log('database ref', userRef)
        // Faça o upload da imagem para o Firebase Storage e obtenha o URL de download
        if (selectedImage==null) {
          imageUrl = defaultImageUrl;
          console.log('Imagem nula')
        } else {
          const {uri} = renderImage;
          const filename = uri.substring(uri.lastIndexOf('/') + 1);
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          const storageRef = ref(storage, `users/${uid}/${filename}`);
          console.log('storageRef', storageRef)
          await putFile(storageRef, uploadUri);
          imageUrl = await getDownloadURL(storageRef);
          console.log('Imagem enviada com sucesso:', imageUrl);
        }
        
  
        const userData = {
          name: name,
          profileImage: imageUrl, // Use o URL de download da imagem aqui
          email: email,
        };
        
        //console.log('userRef e userData',userRef, userData)
        //console.log('url da imagem:', imageUrl)
        await set(userRef, userData);
        console.log('Cadastro realizado com sucesso!');
        Alert.alert('Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } catch (err) {
        console.error('Erro ao criar usuário:', err);
        Alert.alert('Erro ao criar usuário', err.message);
      }
    }
  };
  
  const handleImageUpload = () => {
    console.log('Função handleImageUpload foi chamada');
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      storageOptions: {
      skipBackup: true,
      path: 'profileImages'
    }
    };
  
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Escolha de imagem cancelada');
      } else if (response.error) {
        console.error('Erro ao escolher imagem: ', response.error);
      } else {
        let source = response.assets[0].uri;
        //let teste = response;
        const teste = { uri: response.assets[0].uri };
        console.log('URI da imagem selecionada:', source);
        console.log('data', response)
        setSelectedImage(source);
        setRenderImage(teste);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <View style={styles.subContainer}>
          <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={{ color: 'white' }}>Adicionar Foto</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.title}>Cadastre-se!</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="name"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#000', fontWeight: '600', fontSize: 14 }}>Já tem cadastro? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#6727E8', fontWeight: '600', fontSize: 14 }}> Entrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>

  );
}

export default Register;
