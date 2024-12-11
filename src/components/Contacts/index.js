import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { auth, database } from '../../../firebaseConfig';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {useConversationStore, useFrienIdStore} from '../../../reducer';
import { styles } from './styles';



const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();



  useEffect(() => {
    const uid = auth.currentUser.uid;
    const friendsRef = database.ref(`users/${uid}/friends`);

    friendsRef.on('value', async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.values(data);
        const contactsWithDetails = await Promise.all(contactList.map(async (contact) => {
          const userSnapshot = await database.ref('users')
            .orderByChild('email')
            .equalTo(contact.email)
            .once('value');
          const userData = userSnapshot.val();
          if (userData) {
            const user = Object.values(userData)[0];
            return {
              ...contact,
              uid: { uid },
              name: user.name,
              photoURL: user.profileImage,
            };
          }
          return contact;
        }));

        setContacts(contactsWithDetails);
        setFilteredContacts(contactsWithDetails);
      }
    });
  }, []);

  const addFriend = () => {
    if (newFriendEmail) {
      if (!contacts.some((contact) => contact.email === newFriendEmail)) {
        const currentUser = auth.currentUser;
        const currentUid = currentUser.uid;
        database.ref('users')
          .orderByChild('email')
          .equalTo(newFriendEmail)
          .once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const friendUid = Object.keys(userData)[0];
              const userRef = database.ref(`users/${currentUid}`);
              const newFriendRef = userRef.child('friends').push();
              newFriendRef.set({ email: newFriendEmail, uid: friendUid });
              const friendRef = database.ref(`users/${friendUid}`);
              const newFriendForFriendRef = friendRef.child('friends').push();
              newFriendForFriendRef.set({ email: currentUser.email, uid: currentUid });
              setFilteredContacts((prevFilteredContacts) => [
                ...prevFilteredContacts,
                { email: newFriendEmail, uid: friendUid },
              ]);
            } else {
              console.log('Este email não pertence a nenhum usuário.');
              Alert.alert('Este email não pertence a nenhum usuário.');
            }
          })
          .catch((error) => {
            console.error('Erro ao verificar o email:', error);
          });
      } else {
        console.log('Este amigo já está na sua lista de contatos.');
        Alert.alert('Este amigo já está na sua lista de contatos.');
      }
    }
  };

  const filterContacts = (text) => {
    setSearchEmail(text);
    if (text) {
      const filtered = contacts.filter((contact) =>
        contact.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };
  const handleContactPress = async (contact) => {
    const currentUser = auth.currentUser;
    const currentUid = currentUser.uid;
  
    // Obtém o email do contato selecionado
    const selectedContactEmail = contact.email;
  
    database.ref('users')
      .orderByChild('email')
      .equalTo(selectedContactEmail)
      .once('value')
      .then(async (snapshot) => {
        const userData = snapshot.val();
  
        if (userData) {
          // Encontrou o usuário com o email selecionado
          const friendUid = Object.keys(userData)[0];
          useFrienIdStore.setState({ friendId: friendUid });
          //console.log(friendUid)
          // Gere um ID único para a conversa
          const conversationId1 = `${currentUid}${friendUid}`;
          const conversationId2 = `${friendUid}${currentUid}`;
  
          // Verifique se a conversa já existe com os dois possíveis IDs
          const conversationRef1 = database.ref(`conversations/${conversationId1}`);
          const conversationSnapshot1 = await conversationRef1.once('value');
  
          const conversationRef2 = database.ref(`conversations/${conversationId2}`);
          const conversationSnapshot2 = await conversationRef2.once('value');
  
          let existingConversationId = null;
  
          if (conversationSnapshot1.exists()) {
            existingConversationId = conversationId1;
          } else if (conversationSnapshot2.exists()) {
            existingConversationId = conversationId2;
          }
  
          if (existingConversationId) {
            // Já existe uma conversa, vá para ela
            useConversationStore.setState({ conversationId: existingConversationId });
            navigation.navigate("Chat");
          } else {
            // Crie uma nova conversa
            const conversationRef = database.ref(`conversations/${conversationId1}`);
            conversationRef.set({
              participants: [currentUid, friendUid], 
              id: conversationId1
            });
  
            // Vá para a nova conversa
            useConversationStore.setState({ conversationId: conversationId1 });
            console.log(useConversationStore)
            navigation.navigate("Chat");
          }
        } else {
          // Não encontrou nenhum usuário com o email selecionado
          console.log('Não foi possível encontrar o usuário com o email selecionado.');
          Alert.alert('Não foi possível encontrar o usuário com o email selecionado.');
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar o email:', error);
      });
  };
  
  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>
        Meus Contatos
      </Text>
      <View style={styles.inputContainer}>
        <Icon name="search" color={'black'} size={23} style={styles.inputIcon} />
        <TextInput
          placeholder="Pesquisar por email"
          onChangeText={filterContacts}
          value={searchEmail}
          style={styles.input}
        />
      </View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContactPress(item)} 
          >
            {item.photoURL ? (
            <Image source={{ uri: item.photoURL }} style={styles.contactImage} />
            ) : (
              <Image source={require('../../assets/logo.png')} style={styles.userProfileImage} />
              )}
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>

        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email do novo amigo"
          onChangeText={(text) => setNewFriendEmail(text)}
          value={newFriendEmail}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addFriend}>
          <Text style={styles.addButtonText}>Adicionar Amigo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contacts;
