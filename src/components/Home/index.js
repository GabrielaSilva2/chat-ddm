import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../../firebaseConfig';
const backImage = require("../../assets/logoW.png");
import {useConversationStore, useFrienIdStore} from '../../../reducer';


const Home = () => {
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userName, setUsername] = useState('');
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();


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

    const conversationsRef = database.ref(`conversations`);
    conversationsRef.on('value', (snapshot) => {
      const conversationsData = snapshot.val();
      if (conversationsData) {
        const conversationsArray = Object.values(conversationsData);
        const userConversations = conversationsArray.filter((conversation) =>
          conversation.participants.includes(uid)
        );

        if (userConversations.length === 0) {
          return;
        }
        const sortedConversations = userConversations.map((conversation) => {
          const messages = conversation.messages;
          if (messages) {
            const messageKeys = Object.keys(messages);
            const lastMessageKey = messageKeys[0]; // Última mensagem é a mais recente
            const lastMessage = messages[lastMessageKey];
            conversation.timestamp = lastMessage.timestamp; // Adicione um campo de timestamp
          } else {
            conversation.timestamp = 0; // Defina um valor padrão se não houver mensagens
          }
          return conversation;
        });
        
        // Ordene as conversas por timestamp em ordem decrescente
        sortedConversations.sort((a, b) => b.timestamp - a.timestamp);
        
        const conversationsWithUserInfo = sortedConversations.map((conversation) => {
           const otherUserId = conversation.participants.find((participantId) => participantId !== uid);
          //console.log('teste', otherUserId)
          const otherUserRef = database.ref(`users/${otherUserId}`);
          const otherConversationId = conversation.id
          return otherUserRef.once('value')
            .then((otherUserSnapshot) => {
              const otherUserData = otherUserSnapshot.val();
              //console.log('friend id', otherUserData)
              const updatedConversation = {
                ...conversation,
                otherUserId: otherUserId,
                otherUserName: otherUserData.name,
                otherUserProfileImage: otherUserData.profileImage,
                id: otherConversationId
              };

              const messages = conversation.messages;
              if (messages) {
                const messageKeys = Object.keys(messages);
                const firstMessageKey = messageKeys[0]; 
                const firstMessage = messages[firstMessageKey];
                //console.log('primeira mensagem', firstMessage);

                const messageDate = new Date(firstMessage.timestamp);

                const day = messageDate.getDate().toString().padStart(2, '0');
                const month = (messageDate.getMonth() + 1).toString().padStart(2, '0'); 
                const year = messageDate.getFullYear().toString().slice(-2); 
                const hours = messageDate.getHours().toString().padStart(2, '0'); 
                const minutes = messageDate.getMinutes().toString().padStart(2, '0'); 

                const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

                updatedConversation.firstMessage = firstMessage.text;
                updatedConversation.firstMessageDateTime = formattedDateTime;
              }

              return updatedConversation;
            });
        });


        Promise.all(conversationsWithUserInfo).then((conversationsWithInfo) => {
          setConversations(conversationsWithInfo);
        });
      }
    });
  }, []);

  const navigateToChat = (conversation, friendUid) => {
    //console.log('id', conversation);
    useFrienIdStore.setState({ friendId: friendUid });
    useConversationStore.setState({ conversationId: conversation });
    navigation.navigate('Chat');
  };


  return (
    <View style={styles.container}>
      <View style={styles.linearGradient}>
        <Image source={backImage} style={styles.logoImage} />
        <View style={styles.image}>
          {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../../assets/logo.png')} style={styles.userProfileImage} />
          )}
          <Text style={styles.textProfileName}>
            {userName}
          </Text>
        </View>
      </View>
      {conversations.length === 0 ? (
        <Text>Não há conversas disponíveis.</Text>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToChat(item.id, item.otherUserId)} style={styles.conversationItem}>
              {item.otherUserProfileImage ? (
                <Image source={{ uri: item.otherUserProfileImage }} style={styles.userProfileImage} />
              ) : (
                <Image source={require('../../assets/logo.png')} style={styles.userProfileImage} />
              )}
              <View style={styles.conversationInfo}>
                <Text style={styles.conversationName}>{item.otherUserName}</Text>
                <Text style={styles.lastMessage}>{item.firstMessage?(item.firstMessage):('Imagem ou arquivo')}</Text>
                <Text style={styles.lastMessageDate}>{item.firstMessageDateTime}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E1DD',
  },
  linearGradient: {
    borderBottomLeftRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B0A3E',
    padding: 8,
  },
  profileImage: {
    marginTop: 15,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 20,
  },
  logoImage: {
    width: 100,
    height: 60,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  textProfileName: {
    color: '#F10808',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    alignItems: 'flex-end',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  conversationInfo: {
    marginLeft: 16,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  lastMessage: {
    fontSize: 16,
    marginTop: 5,
    color: '#581845',
  },
  lastMessageDate: {
    fontSize: 14,
    color: '#000',
    marginLeft: 200
  },
});

export default Home;
