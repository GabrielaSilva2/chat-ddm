import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';



const useConversationStore = create((set) => ({
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
}));

const useFrienIdStore = create((set) => ({
  friendId: null,
  setFriendId: (id) => set({ friendId: id }),
}));

const userStateStore = create((set) => ({
  authState: null,
  setAuthState: async (authenticated) => {
    set({ authState: authenticated });
    // Persistir o estado de autenticação localmente
    await AsyncStorage.setItem('authState', JSON.stringify(authenticated));
  },
  initializeAuthState: async () => {
    // Recupere o estado de autenticação do AsyncStorage
    const authState = await AsyncStorage.getItem('authState');
  
    // Se o valor não existir no AsyncStorage, defina-o como false por padrão
    if (authState === null) {
      await AsyncStorage.setItem('authState', JSON.stringify(false));
      set({ authState: false });
    } else {
      set({ authState: JSON.parse(authState) });
    }
  },
}));

export { useConversationStore, useFrienIdStore, userStateStore};
