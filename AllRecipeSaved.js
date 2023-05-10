import React, {useState} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View, ScrollView} from 'react-native'

function AllRecipeSaved({i, historyRecipe}) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal =()=>{
    setModalVisible(true)}

  return (
    <SafeAreaView>
    <Pressable
        style={[styles.buttonOpen]}
        onPress={openModal}>
        <Text style={styles.seeMore}>&#128196;</Text>
    </Pressable>

    <Modal
      transparent={true}
      visible={modalVisible}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyleButton}>&#10006;</Text>
        </Pressable>
      <Text style={styles.recipeName}>{historyRecipe[i].name}</Text>
      <ScrollView>
      {historyRecipe[i].ingredients.map((ingredient)=>(
        <View style={styles.ingredients}>
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
    </ScrollView>
    <View style={styles.totals}>
    <Text  style={styles.total}>TOTAL</Text>
    <Text  style={styles.total}>&#128293; Energy - {Math.round(historyRecipe[i].ingredients.reduce((total,food)=>(total + food.kcal),0))} kcal</Text>
    <Text>&#129379; Quantity - {Math.round(historyRecipe[i].ingredients.reduce((total,food)=>(total + food.qty),0))}g</Text>
    </View>
    </View>
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
    justifyContent:'center',
    alignItems:'center'
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
    height:650,
      width:350,
  },
    modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  seeMore:{
    fontSize:25,
  },
  buttonClose:{
    alignSelf:'flex-end',
      marginBottom:15,
  },
  textStyleButton:{
    textAlign:'center',
    fontSize:25,
  },
  total:{
    fontSize:15,
    textAlign:'center',
    paddingBottom:10,
  },
  totals:{
    margin:10,
    alignSelf:'center'
  },
  recipeName:{
    fontSize:25,
    marginBottom:20,
  },
  ingredients:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10,
    padding:10,
    marginTop:10,
  }
});