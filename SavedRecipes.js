import React, {useState, useEffect} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View, LogBox, ScrollView} from 'react-native'
import AllRecipeSaved from './AllRecipeSaved'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SavedRecipes = ({historyRecipe, setHistoryRecipe}) => {
    const [modalVisible, setModalVisible] = useState(false);


    const openModal =()=>{
        setModalVisible(true)
    }

    // structure of each recipe (actual recipe) {name:"", ingredients: [{desc:"",cat:"",kcal:""},{desc:"",cat:"",kcal:""}]}

    const _storeData = async (x) => {
      try {
        await AsyncStorage.setItem('historyRecipe', JSON.stringify(x));
      } catch (error) {}
    };

  useEffect(
    () => {
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('historyRecipe');
      let bringBackToObj= JSON.parse(value)
      setHistoryRecipe(bringBackToObj)
  } catch (error) {}
  };
  _retrieveData()
},[]);


    const displayhistoryRecipe = () => (
      historyRecipe.map((recipe, i)=>(
  
          <View style={styles.recipeSaved}>
          <Text 
              style={styles.text}
              >{recipe.name}
          </Text>
          <View style={styles.buttonsSavedRecipe}>
          <AllRecipeSaved i={i} historyRecipe={historyRecipe}/>
          <Pressable style={[styles.buttonDelete]} onPress={()=>{deleteFromHistory(i)}}>
            <Text style={styles.deleteOne}>&#128465;</Text>
          </Pressable>
          </View>
          </View>
      ))
    )

    const deleteFromHistory = (i)=>{
      const temp = [...historyRecipe]
      temp.splice(i,1)
      setHistoryRecipe(temp)
      _storeData(temp)
    }

  return (
    <SafeAreaView>
    <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={openModal}>
        <Text style={styles.textStyleButton}>SAVED RECIPES</Text>
    </Pressable>

    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible)}}>

    <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <Pressable
            style={[styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyleButtonCross}>&#10006;</Text>
    </Pressable>
    { historyRecipe.length > 0 && <Text style={[styles.modalText, styles.title]}>YOUR SAVED RECIPES</Text>}
    { historyRecipe.length < 1 && <Text style={[styles.modalText, styles.noRecipes]}>There aren't saved recipes</Text>}
    <ScrollView style={styles.displayHistory}>
    {displayhistoryRecipe()}
    </ScrollView>
    </View>
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
      title:{
        fontSize:25,
      },
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
    textStyleButton: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center',
        fontSize:15,
        letterSpacing:2,
        paddingLeft:50
      },
      textStyleButtonCross: {
        fontSize:23
      },
    buttonOpen:{
      width:250,
      height:40,
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
    buttonSeeMore:{
      width:70,
      marginTop:10,
    },
    recipeSaved:{
      flex:3,
      flexDirection:'row',
      alignItems:'center',
      gap:20,
      borderWidth:1,
      borderColor:'gray',
      borderRadius:10,
      width:260,
      marginTop:20,
      padding:10,
    },
    buttonClose:{
      alignSelf:'flex-end',
      marginBottom:20,
    },
    noRecipes:{
      fontSize:20,
      textAlign:'center',
    },
    deleteOne:{
      fontSize:25,
    },
    text:{
      fontSize:15,
    },
    displayHistory:{
      alignSelf:'center'
    },
    buttonsSavedRecipe:{
      flex:1,
      flexDirection:'row',
      gap:20,
      justifyContent:'flex-end'
    }
    
  });