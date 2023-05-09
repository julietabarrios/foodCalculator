import React, {useState,useEffect} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View} from 'react-native'
import {TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ActualSearch = ({chosenOption, historyRecipe, setHistoryRecipe, setSuccessMessage}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [actualRecipe, setActualRecipe]=useState({name:"", ingredients: []})
    const [message, setMessage]= useState('')
    
    const openCloseModal =()=>{
        setModalVisible(!modalVisible)
    }

    useEffect(
      () => {
        if(chosenOption.description != ""){
        const temp = [...actualRecipe.ingredients]
        temp.push(chosenOption)
        setActualRecipe({...actualRecipe,ingredients:temp})
      }
      },[chosenOption]);


      const displayActualRecipe = () => (
        actualRecipe.ingredients.map((food, i)=>(
            <View style={styles.optionResult}>
            <Text 
                style={styles.text}
                key={i}>Food: {food.description}
            </Text>
            <Text 
                style={styles.text}
                key={i}>Category: {food.category}
            </Text>
            <Text 
                style={styles.text}
                key={i}>KCAL: {food.kcal}
            </Text>
            <Pressable style={[styles.button, styles.buttonOpen]} onPress={()=>{deleteFromRecipe(i)}}>
              <Text>&#128465;</Text>
            </Pressable>
        </View>
        ))
      )

      const handleNameRecipe = (text)=>{
        setActualRecipe({...actualRecipe, name: text})
      }

      const deleteFromRecipe = (i)=>{
        const temp=[actualRecipe.ingredients]
        temp.splice(i,1)
        setActualRecipe({...actualRecipe, ingredients:temp})
      }

      const deleteAll = ()=>{
        setActualRecipe({name:"", ingredients: []})
      }

      const saveToHistory = ()=>{
        console.log(actualRecipe);
        if (actualRecipe.name!=''){
          // SET HISTORY RECIPE HERE IN A USE EFFECT
          const temp = [...historyRecipe]
          temp.push(actualRecipe)
          setHistoryRecipe(temp)
          openCloseModal()
          setActualRecipe({name:"", ingredients: []})
          setSuccessMessage('The recipe was successfully added to your history!')
          setTimeout(() => {
            setSuccessMessage('');
          }, 4000);
        }
        else if (actualRecipe.ingredients.length>0){
          setMessage('Before saving you should input a recipe name')
          setTimeout(() => {
            setMessage('');
          }, 4000);
        }
      }


      const _storeData = async () => {
        try {
          // we need to stringify our array into a string
          await AsyncStorage.setItem('dataNumbers', JSON.stringify(data) );
        } catch (error) {
          // Error saving data
        }
      };
    


  return (
    <SafeAreaView>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={openCloseModal}>
          <Text style={styles.textStyleButton}>Actual recipe</Text>
        </Pressable>
    
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.modalView, styles.centeredView]}>
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={openCloseModal}>
            <Text style={styles.textStyleButton}>x</Text>
        </Pressable>
          {actualRecipe.ingredients.length > 0 && 
          <TextInput 
          style={styles.input}
          onChangeText={(text) => handleNameRecipe(text)}
          value={actualRecipe.name}/>}

          {actualRecipe.ingredients.length < 1 && <Text>There aren't saved ingredients</Text>}
          {actualRecipe.ingredients.length > 0 && <Text style={styles.modalText}>Edit your Recipe</Text>}
          {actualRecipe.ingredients.length > 0 && displayActualRecipe()}
          {actualRecipe.ingredients.length > 0 && <Text>Total kcal: {actualRecipe.ingredients.reduce((total,food)=>(total + food.kcal),0)}</Text>}
          <Text>{message}</Text>

        {actualRecipe.ingredients.length >0 && <Pressable onPress={saveToHistory} style={[styles.button, styles.buttonClose]}>
        <Text style={styles.textStyleButton}>Save Recipe</Text> 
        </Pressable>}
        {actualRecipe.ingredients.length >0 &&<Pressable onPress={deleteAll} style={[styles.button, styles.buttonClose]} >
        <Text style={styles.textStyleButton}>Delelte all the Recipe</Text> 
        </Pressable>}
        </View>
      </Modal>

    </SafeAreaView>
    )
}

export default ActualSearch

const styles = StyleSheet.create({
    button:{
      padding: 10,
      elevation: 2, 
      backgroundColor: 'black',
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