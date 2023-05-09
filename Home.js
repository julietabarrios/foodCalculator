import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Modal, Pressable } from 'react-native';
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

    return (
    <SafeAreaView style={styles.container}>
    <View style={styles.topBar}>
    <SavedRecipes historyRecipe={historyRecipe} setHistoryRecipe={setHistoryRecipe}/>      
    <ActualRecipe chosenOption={chosenOption} historyRecipe={historyRecipe} setHistoryRecipe={setHistoryRecipe} setSuccessMessage={setSuccessMessage}/>
    </View>

      <Text style={styles.title}>Search for an ingredient</Text>
    <View style={styles.inputPart}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        value={search}
   />
    <Pressable
        style={[styles.button]}
        onPress={showResult}>
        <Text style={styles.textStyleButton}>&#128270;</Text>
    </Pressable>
    </View>

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

      <TextInput
        style={styles.input}
        onChangeText={(number) => setQty(Number(number))}
        value={qty}/>

      {!isNaN(Number(qty)) && qty != "" && <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => saveInActualSearch()}>
            <Text style={styles.textStyleButton}>Save</Text>
      </Pressable>}

    { isNaN(Number(qty)) && <Text>Invalid quantity provided. You must input a number of grames</Text>}
    {qty == "" && <Text>Provide a number of grames</Text>}
    </View>
    </Modal>
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
    borderColor:'#8FBC8F',
    borderStyle:'solid',
    borderWidth:1,
  },
  input:{
    borderStyle: "solid",
    borderColor:"black",
    borderWidth:3,
    width:350,
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
  },
  topBar:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  results:{
    height:90,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});



