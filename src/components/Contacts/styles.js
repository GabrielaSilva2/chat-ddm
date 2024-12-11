import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 8,
    },
    contactImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      backgroundColor: '#E4E1DD',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    input: {
      flex: 1,
      fontSize: 16,
      marginLeft: 8,
    },
    inputIcon: {
      marginLeft: 8,
    },
    addButton: {
      backgroundColor: '#1B0A3E',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  