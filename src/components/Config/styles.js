import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 12,
    },
    infoContainer: {
      marginBottom: 20,
    },
    infoText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1B0A3E',
      marginVertical: 30,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    logoutButtonText: {
      fontSize: 18,
      marginHorizontal: 15,
      color: '#1B0A3E',
    },
  });
  