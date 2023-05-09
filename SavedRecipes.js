import React, {useState} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View, LogBox} from 'react-native'
import AllRecipeSaved from './AllRecipeSaved'


const SavedRecipes = ({historyRecipe, setHistoryRecipe}) => {
    const [modalVisible, setModalVisible] = useState(false);


    const openModal =()=>{
        setModalVisible(true)
    }

    // structure of each recipe (actual recipe) {name:"", ingredients: [{desc:"",cat:"",kcal:""},{desc:"",cat:"",kcal:""}]}

    const displayhistoryReceipe = () => (
      historyRecipe.map((receipe, i)=>(
          <View style={styles.receipeSaved}>
          <Text 
              style={styles.text}
              >Receipe: {receipe.name}
          </Text>
          <AllRecipeSaved i={i} historyRecipe={historyRecipe}/>
          <Pressable style={[styles.buttonSavedRecipe, styles.buttonDelete]} onPress={()=>{deleteFromHistory(i)}}>
            <Text>&#128465;</Text>
          </Pressable>
      </View>
      ))
    )

    const deleteFromHistory = (i)=>{
      const temp = [...historyRecipe]
      temp.splice(i,1)
      setHistoryRecipe(temp)
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
    { historyRecipe.length > 0 && <Text style={[styles.modalText]}>Your saved recipes</Text>}
    { historyRecipe.length < 1 && <Text style={[styles.modalText]}>There aren't saved recipes</Text>}
    {displayhistoryReceipe()}
    </View>
    </Modal>
    </SafeAreaView>
    )
}

export default SavedRecipes

const styles = StyleSheet.create({
    button:{
        padding: 10,
        elevation: 2, 
        backgroundColor:'black',
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
    buttonSavedRecipe:{
      borderColor:'black',
      borderStyle:'solid',
      borderWidth:2,
      borderRadius:5
    },
    buttonDelete:{
      width:30,
      marginTop:10,
    },
    buttonSeeMore:{
      width:70,
      marginTop:10,
    },
    receipeSaved:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    }
  });