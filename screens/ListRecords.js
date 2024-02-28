import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { firebase } from "../config";

const auth = firebase.auth();
const firestore = firebase.firestore();

const ListRecords = ({ navigation }) => {
  const [data, setData] = useState([]);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Client Information",
      headerStyle: {
        backgroundColor: "#cf93c0", // Cambia el color de fondo del encabezado
      },
      headerTintColor: "white", // Cambia el color del texto en el encabezado
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      const activitiesRef = firestore.collection(
        `users/${user.email}/activities`
      );

      try {
        const snapshot = await activitiesRef.get();

        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          clientName: doc.data().clientName,
          dateStart: doc.data().dateStart,
        }));

        setData(newData);
      } catch (error) {
        console.error("Error al obtener datos de Firestore:", error);
      }
    };

    fetchData();
  }, []); // Se ejecutará solo una vez al montar el componente

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image
        source={require("../assets/ListIconNurse.png")}
        style={{ width: 55, height: 55, borderRadius: 30 }}
      />
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item.clientName}</Text>
        <Text>{item.dateStart}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "green" }}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:60
    },
    listItem:{
      margin:10,
      padding:20,
      backgroundColor:"#FFF",
      width:"90%",
      flex:1,
      alignSelf:"center",
      alignItems: "center",
      flexDirection:"row",
      borderRadius:15
    }
  });

export default ListRecords;
