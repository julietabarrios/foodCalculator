import React, {useState} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View} from 'react-native'

function AllRecipeSaved({i, historyRecipe}) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal =()=>{
    setModalVisible(true)}

  return (
    <SafeAreaView>
    <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={openModal}>
        <Text style={styles.textStyleButton}>See details</Text>
    </Pressable>

    <Modal
      transparent={true}
      visible={modalVisible}
      >
        <View style={[styles.modalView, styles.centeredView]}>
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyleButton}>x</Text>
        </Pressable>

      {historyRecipe[i].ingredients.map((ingredient)=>(
        <View>
        <Text 
          style={styles.text}
            >Food: {ingredient.description}
        </Text>
        <Text 
            style={styles.text}
            >Category: {ingredient.category}
        </Text>
        <Text 
              style={styles.text}
              >Quantity: {ingredient.qty}g
        </Text>
        <Text 
            style={styles.text}
            >Energy: {ingredient.kcal} kcal
        </Text>
        </View> 
    ))}
    <Text>Total energy: {historyRecipe[i].ingredients.reduce((total,food)=>(total + food.kcal),0)} kcal</Text>
    <Text>Total quantity: {historyRecipe[i].ingredients.reduce((total,food)=>(total + food.qty),0)}g</Text>
    </View>
    </Modal>
    </SafeAreaView>
  )
}

export default AllRecipeSaved

const styles = StyleSheet.create({
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
    modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});