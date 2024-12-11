import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#1B0A3E',
      alignSelf: "flex-end",
      paddingBottom: 24,
    },
    imageUploadButton: {
      alignItems: 'flex-start',
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    subContainer: {
      flexDirection: 'row',
      marginTop: 100,
      marginBottom: 20,
      justifyContent: 'space-between',
    },
  
    imagePlaceholder: {
      width: 100,
      height: 100,
      backgroundColor: '#1B0A3E',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      backgroundColor: "#F6F7FB",
      height: 58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding: 12,
    },
    backImage: {
      width: "100%",
      height: 340,
      position: "absolute",
      top: -40,
      resizeMode: 'cover',
    },
    whiteSheet: {
      width: '100%',
      height: '72%',
      position: "absolute",
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 60,
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    button: {
      backgroundColor: '#1B0A3E',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
  });