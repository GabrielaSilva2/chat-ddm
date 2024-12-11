import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getDatabase } from '@react-native-firebase/database';
import { getStorage } from '@react-native-firebase/storage';



const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PATH.firebaseapp.com",
  databaseURL: "YOUR_PATH.firebaseio.com",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_PATH",
  messagingSenderId: "YOUR_ID",
  appId: "id",
};

// Inicialize o Firebase com a configuração
const firebaseApp = initializeApp(firebaseConfig);

// Obtenha as instâncias do Firebase que você deseja usar
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

// Agora você pode exportar essas instâncias para uso em todo o seu aplicativo
export { auth, database, storage };
