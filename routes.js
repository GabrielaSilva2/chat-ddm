import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Iconn from 'react-native-vector-icons/Entypo';
import Iconnn from 'react-native-vector-icons/AntDesign'
import Iconnnn from 'react-native-vector-icons/SimpleLineIcons'
import RegisterScreen from "./src/pages/Register";
import LoginScreen from "./src/pages/Login"
import HomeScreen from "./src/pages/Home"
import ProfileScreen from "./src/pages/Profile"
import ConfigScreen from "./src/pages/Config"
import ContactsScreen from "./src/pages/Contacts"
import ChatScreen from "./src/pages/Chat"
import LoadingScreen from "./src/pages/Loading"
import {userStateStore} from './reducer';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true} 
      activeColor="#1B0A3E" 
      inactiveColor="#000" 
      barStyle={{ backgroundColor: '#fff' }} 
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <Iconn name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Contatos',
          tabBarIcon: ({ color }) => (
            <Iconnn name="contacts" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          tabBarLabel: 'Configuração',
          tabBarIcon: ({ color }) => (
            <Iconnnn name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Routes = () => {
  const authState = userStateStore((state) => state.authState);
  console.log('authstate:', authState)

  if (authState === null) {
    // Se o estado de autenticação ainda estiver sendo inicializado, exiba uma tela de carregamento
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator initialRouteName={authState === true ? 'MainTabNavigator': 'Register' }>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Routes;