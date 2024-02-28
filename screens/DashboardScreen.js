import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../config';

const auth = firebase.auth();
const firestore = firebase.firestore();

const DashboardScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => { 
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await firestore.collection('users').doc(user.email).collection("info").doc("userData").get();
          const userData = userDoc.data(); 
          if (userData) {
            const {fullName} = userData;
            setUserName(`${fullName}`);
          }else{
           // console.log("No user");
          }
        }
      } catch (error) {
     //   console.error('Error fetching user information:', error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      navigation.replace('SignUp');
    } catch (error) {
    //  console.error(error.message);
    }
  };

 // console.log(userName);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Dashboard, {userName} 👋</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#e74c3c' }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DashboardScreen;