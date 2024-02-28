import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Logs } from 'expo'

export default function  ButtonGradient ({ onPress, text, margintop }) {

    Logs.enableExpoCliLogging()

    return (
        <TouchableOpacity
      style={[styles.container, { marginTop: margintop || 30 }]}
      onPress={() => {
        onPress();
      }}
    >
            <LinearGradient
                // Button Linear Gradient
                colors={['#c78fb9', '#DBB8D2']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}    
                style={styles.button}
            >
                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 200,
    },

    text: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
  });