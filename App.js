import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'
import { LogBox } from 'react-native';
import {userStateStore} from './reducer'
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

const App = () => {
  const initializeAuthState = userStateStore((state) => state.initializeAuthState);

  useEffect(() => {
    // Chame initializeAuthState aqui para inicializar o estado de autenticação
    initializeAuthState();
  }, []);
  return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
  );
};

export default App;