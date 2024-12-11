import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#E4E1DD', 
      
    },
    header: {
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 16,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 80,
      borderWidth: 2,
      borderColor: 'white',
    },
    textProfileName: {
      color: 'black', 
      fontSize: 24,
      marginTop: 16,
      fontWeight: 'bold',
    },
    inputIcon: {
      marginLeft: 4,
    },
    form: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 50,
      backgroundColor: '#fff', 
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      
    },
    input: {
      flex: 1,
      fontSize: 16,
      marginLeft: 8,
    },
    button: {
      backgroundColor: '#1B0A3E', 
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButton: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 18,
    },
  });