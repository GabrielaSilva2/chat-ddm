import React, { useState } from "react";
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import LoginWithGoogle from '../LoginWithGoogle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userStateStore} from '../../../reducer';
import {styles} from './styles';

const backImage = require("../../assets/logo.png");
const LoginWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const setAuthState = userStateStore((state) => state.setAuthState);
  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const user = userCredential.user;
          const uid = user.uid;
          
          AsyncStorage.setItem('userUid', uid)
            .then(() => {
              console.log('UID do usuário salvo no AsyncStorage');
              console.log('Login realizado com sucesso!');
              Alert.alert('Login realizado com sucesso!');
              setAuthState(true);
              navigation.navigate('MainTabNavigator');

            })
            .catch((err) => {
              console.error('Erro ao salvar UID do usuário:', err);
              Alert.alert('Erro ao fazer login', err.message);
            });
        })
        .catch((err) => {
          console.error('Erro ao fazer login:', err);
          Alert.alert('Erro ao fazer login', err.message);
        });

    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Entrar</Text>
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
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Entrar</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 14 }}>Não possui cadastro? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: '#6727E8', fontWeight: '600', fontSize: 14 }}> Cadastrar-se</Text>
          </TouchableOpacity>
          <LoginWithGoogle />
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

export default LoginWithEmail;
