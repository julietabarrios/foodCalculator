import React, {useState,useEffect} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View, ScrollView, Alert} from 'react-native'
import {TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ActualSearch = ({chosenOption, historyRecipe, setHistoryRecipe, setSuccessMessage, setModalActual}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [actualRecipe, setActualRecipe]=useState({name:"", ingredients: []})
    const [message, setMessage]= useState('')
    
    const openModal =()=>{
        setModalVisible(true)
        setModalActual(true)
    }

    const closeModal =()=>{
      setModalVisible(false)
      setModalActual(false)
  }

    useEffect(
      () => {
        if(chosenOption.description != ""){
        const temp = [...actualRecipe.ingredients]
        temp.push(chosenOption)
        setActualRecipe({...actualRecipe,ingredients:temp})
      }
      },[chosenOption]);

      const alert =(recipe,i) => {
        Alert.alert(
          `Are you sure you want to delete all the actual recipe without saving it?`,'',
          [
          {text: 'Yes', onPress: () => deleteAll()},
          {text: 'No'},
          ],
          { cancelable: false }
          )
      }

      const displayActualRecipe = () => (
        actualRecipe.ingredients.map((food, i)=>(
            <View style={styles.optionResult}>
            <View style={styles.textIngredient}>
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
                key={i}>Quantity: {food.qty}g
            </Text>
            <Text 
                style={styles.text}
                key={i}>Energy: {food.kcal} kcal
            </Text>
            </View>
            <Pressable onPress={()=>{deleteFromRecipe(i)}}>
              <Text style={[styles.buttonDeleteOne]}>&#128465;</Text>
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
        if (actualRecipe.name!=''){
          const temp = [...historyRecipe]
          temp.push(actualRecipe)
          setHistoryRecipe(temp)
          _storeData(temp)
          closeModal()
          setActualRecipe({name:"", ingredients: []})
          setSuccessMessage('The recipe was successfully added to your history')
          setTimeout(() => {
            setSuccessMessage('');
          }, 4000);
        }
        else if (actualRecipe.ingredients.length>0){
          setMessage('Before saving you should input a recipe name')
          setTimeout(() => {
            setMessage('');
          }, 8000);
        }
      }

      const _storeData = async (x) => {
        try {
          await AsyncStorage.setItem('historyRecipe', JSON.stringify(x));
        } catch (error) {}
      };

  return (
    <SafeAreaView>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={openModal}>
          <Text style={styles.textStyleButton}>ACTUAL RECIPE</Text>
        </Pressable>
    
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          
        <Pressable
            style={[styles.buttonClose]}
            onPress={closeModal}>
            <Text style={styles.textStyleButtonCross}>&#10006;</Text>
        </Pressable>

          {actualRecipe.ingredients.length < 1 && <Text style={styles.noIngredients}>There aren't saved ingredients</Text>}
      
          {actualRecipe.ingredients.length > 0 && 
            <View>
            <Text style={[styles.modalText,styles.title]}>EDIT YOUR RECIPE</Text>
            <TextInput 
            style={styles.input}
            placeholder="Recipe's name"
            onChangeText={(text) => handleNameRecipe(text)}
            value={actualRecipe.name}/>
            <Text style={styles.message}>{message}</Text>
            <ScrollView style={styles.scrollView}>
            {displayActualRecipe()}
            <View style={styles.totals}>
            <Text style={styles.total}>TOTAL</Text>
            <Text style={styles.total}> &#128293;ENERGY - {Math.round(actualRecipe.ingredients.reduce((total,food)=>(total + food.kcal),0))} kcal</Text>
            <Text >&#129379; QUANTITY - {Math.round(actualRecipe.ingredients.reduce((total,food)=>(total + food.qty),0))}g</Text>
            </View>
            </ScrollView>
            <Pressable onPress={saveToHistory} style={[styles.button, styles.buttonSaveDelete, styles.buttonSave]}>
            <Text style={styles.textStyleButtonModal}>Save recipe</Text> 
            </Pressable>
            <Pressable onPress={alert} style={[styles.button, styles.buttonSaveDelete, styles.buttonDeleteAll]} >
            <Text style={styles.textStyleButtonModal}>Delelte all the recipe</Text> 
            </Pressable>
            
            </View>}
        
        </View>    
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
    input:{
      height:35,
      width:200,
      alignSelf:'center',
      backgroundColor:'white',
      borderBottomWidth:1,
      borderColor:'gray',
      marginBottom:20,
    },
    text:{
      paddingBottom:5,
    },
    optionResult:{
      flex:1,
      flexDirection:'row',
      borderColor:'gray',
      borderWidth:1,
      borderRadius:10,
      marginBottom:20,
      alignItems:'center',
      justifyContent:'center',
      padding:22,
      gap:10,
    },
    centeredView: {
      flex: 1,
      marginTop: 22,
      justifyContent:'center',
      alignItems:'center'
    },
    title:{
      fontSize:30,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
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
      textAlign:'auto',
      fontSize:15,
      letterSpacing:2,
      paddingLeft:20
    },
    textStyleButtonModal: {
      color: 'white',
      fontWeight: 'bold',
      textAlign:'auto',
      fontSize:15,
      textAlign:'center'
    },
    textStyleButtonCross:{
      fontSize:25,
    },
    buttonOpen:{
      width:250,
      height:50,
      justifyContent:'center',
      
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    buttonClose:{
      alignSelf:'flex-end',
      marginBottom:15,
    },
    buttonSaveDelete:{
      borderRadius:20,
      width:170,
      alignSelf:'center',
      marginTop:10,
    },
    buttonSave:{
      backgroundColor:'#80DC37',
    },
    buttonDeleteAll:{
      backgroundColor:'red'
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
    noIngredients:{
      fontSize:20,
      textAlign:'center',
    },
    message:{
      fontSize:15,
      marginBottom:20,
      color:'red'
    },
    scrollView:{
      height:300,
    },
    buttonDeleteOne:{
      fontSize:25,
    }
  });