import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Modal, Pressable, ScrollView } from 'react-native';
import SavedRecipes from './SavedRecipes';
import ActualRecipe from './ActualRecipe';



export default function Home() {
    const [search, setSearch] = useState('')
    const [result, setResult]=useState([])
    const [chosenOption,setChosenOption]=useState({
        description:'',
        category:'',
        qty:'',
        kcal:''
    })
  const [historyRecipe, setHistoryRecipe]= useState([])
  const [displayOk, setDisplayOk]= useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [qty,setQty]= useState(0)
  const [info, setInfo]= useState({
    option:{},
    nutrient:{}})
  const [message, setMessage]= useState ('')
  const [successMessage, setSuccessMessage]= useState('')


  const showInputQty = (option,nutrient)=>{
    setModalVisible(true)
    setInfo({option:option,nutrient:nutrient})
  }

  const saveInActualSearch = ()=>{
    if (!isNaN(Number(qty))){
    setChosenOption({
        description: info.option.description,
        category:info.option.foodCategory,
        qty:qty,
        kcal:(qty*info.nutrient.value)/100
    })
    setModalVisible(false)
    setDisplayOk(false)
    setSearch('')
    setMessage('The ingredient was successfully saved it!')
    setTimeout(() => {
      setMessage('');
    }, 4000);
  }
  }

  const showResult = async () => {
    try{
        setDisplayOk(true)
        const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=3nfVd5dGrcppdxcvsNUAh8ZqVeE7xZBfeXMLBZUq&query="${search}"`)
        setResult(response.data.foods)
        console.log(response.data)
      }
      catch(error){
        console.log(error);
      }
    }

    const deleteSearch = ()=>{
      setResult([])
      setSearch("")
    }
    return (

    <SafeAreaView style={styles.container}>
    <View style={styles.topBar}>
    <SavedRecipes historyRecipe={historyRecipe} setHistoryRecipe={setHistoryRecipe}/>      
    <ActualRecipe chosenOption={chosenOption} historyRecipe={historyRecipe} setHistoryRecipe={setHistoryRecipe} setSuccessMessage={setSuccessMessage}/>
    </View>

      <Text style={styles.title}>SEARCH FOR AN INGREDIENT</Text>
    <View style={styles.inputPart}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        value={search}
   />
    <Pressable
        style={[styles.buttonSearching]}
        onPress={showResult}>
        <Text style={styles.textStyleButtonSearching}>&#128270;</Text>
    </Pressable>
    </View>
    
    {result.length>1 && displayOk && <Pressable 
      style={styles.buttonClose}
      onPress={deleteSearch}>
      <Text style={styles.textStyleButton}>x</Text>
    </Pressable>}

    <ScrollView style={styles.scrollView}>
    <View style={styles.results}>
    {result.length>1 && displayOk && result.map((option)=>(
        option.foodNutrients.map((nutrient)=>(
        nutrient.unitName == 'KCAL'&&
        <Pressable style={styles.optionResult} onPress={()=>{showInputQty(option, nutrient)}}>
        <Text 
            style={styles.text}
            >Food: {option.description}
        </Text>
        <Text 
            style={styles.text}
            >Category: {option.foodCategory}
        </Text>
        <Text>{nutrient.value} {nutrient.unitName}/100g</Text>
    </Pressable>))))}
    </View>
    </ScrollView>
    <View style={styles.centeredView}>
    <Modal 
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    >
      <View style={styles.centeredView}>
      <View style={styles.modalView}>

      <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyleButton}>x</Text>
    </Pressable>
      <Text style={styles.titleModal}>Quantity of the ingredient</Text>
      <TextInput
        style={styles.inputQty}
        placeholder='g'
        onChangeText={(number) => setQty(Number(number))}
        value={qty}/>
    
      {!isNaN(Number(qty)) && qty != "" && <Pressable
            style={[styles.button, styles.buttonSave]}
            onPress={() => saveInActualSearch()}>
            <Text style={styles.textStyleButton}>Save</Text>
      </Pressable>}

    { isNaN(Number(qty)) && <Text>Invalid quantity provided. You must input a number of grames</Text>}
    {qty == "" && <Text>Provide a number of grames</Text>}
    </View>
    </View>
    </Modal>
    </View>
    <Text>{message}</Text>
    <Text>{successMessage}</Text>
    

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
  },
  optionResult:{
    borderColor:'#80DC37',
    borderStyle:'solid',
    borderRadius:10,
    borderWidth:1,
    padding:13,
    margin:7,
  },
  inputQty:{
    alignSelf:'center',
    borderStyle: "solid",
    borderColor:"black",
    borderWidth:3,
    height:30,
    width:100,
    marginBottom:15,
  },
  input:{
    borderStyle: "solid",
    borderColor:"black",
    borderWidth:3,
    width:310,
    height:50,
    marginLeft:5,
    marginRight:5,
  },
  inputPart:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    textAlign:'center',
    fontSize:30,
    letterSpacing:5,
  },
  topBar:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  scrollView:{
    height:250,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonClose:{
    borderRadius:10,
    backgroundColor:'black',
    width:20,
    marginBottom:10,
  },
  buttonSave:{
    borderRadius:10,
    backgroundColor:'black',
    width:60,
    height:20,
    alignSelf:'center',
  },
  textStyleButton:{
    color:'white',
    textAlign:'center'
  },
  titleModal:{
    fontSize:20,
    marginBottom:20,
    textAlign:'center',
  },
  textStyleButtonSearching:{
    fontSize:35,
  }
});



