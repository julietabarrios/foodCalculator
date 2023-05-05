import React, {useState} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View} from 'react-native'


const SavedRecipes = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal =()=>{
        setModalVisible(true)
    }
  return (
    <SafeAreaView>
    <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={openModal}>
        <Text style={styles.textStyleButton}>Saved Recipes</Text>
    </Pressable>
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible)}}>
    <View style={[styles.modalView, styles.centeredView]}>
    <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyleButton}>x</Text>
    </Pressable>
    <Text style={[styles.modalText]}>Your saved recipes</Text>
    </View>
    </Modal>
    </SafeAreaView>
    )
}

export default SavedRecipes

const styles = StyleSheet.create({
    button:{
        borderRadius: 20,
        padding: 10,
        elevation: 2, 
        backgroundColor: '#C71585',
      },
    centeredView: {
      flex: 1,
      marginTop: 22,
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textStyleButton: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center'
      },
    buttonOpen:{
      width:250,
      marginTop:20,
    },
      modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });