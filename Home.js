import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Modal, Pressable, ScrollView } from 'react-native';
import SavedRecipes from './SavedRecipes';
import ActualRecipe from './ActualRecipe';
import Spinner from 'react-native-loading-spinner-overlay';


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
  const [modalSaved, setModalSaved] = useState(false);
  const [modalActual, setModalActual] = useState(false);
  const [qty,setQty]= useState(0)
  const [info, setInfo]= useState({
    option:{},
    nutrient:{}})
  const [message, setMessage]= useState ('')
  const [successMessage, setSuccessMessage]= useState('')
  const [spinner, setSpinner]= useState(false)



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
        kcal:Math.round((qty*info.nutrient.value)/100)
    })
    setModalVisible(false)
    setDisplayOk(false)
    setSearch('')
    setResult([])
    setQty(0)
    setMessage('The ingredient was successfully saved')
    setTimeout(() => {
      setMessage('');
    }, 4000);
  }
  }

  useEffect(
    () => {
      setSpinner(false)
    },[result]);


  const showResult = async () => {
    try{
        setDisplayOk(true)
        if (result.length<1){
          setSpinner(true)
        }
        const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=3nfVd5dGrcppdxcvsNUAh8ZqVeE7xZBfeXMLBZUq&query="${search}"`)
        setResult(response.data.foods)
        console.log(response.data)
  
        if(response.data.totalHits=="0"){
        setMessage('Ingredient not found')
        setTimeout(() => {
        setMessage('');
         }, 4000);}
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

    <SafeAreaView style={(modalSaved || modalVisible || modalActual)  ? styles.containerOpacity : styles.container }>
    <View style={result.length>1 && displayOk ? styles.topBarWResults: styles.topBar}>
    <SavedRecipes historyRecipe={historyRecipe} setHistoryRecipe={setHistoryRecipe} setModalSaved={setModalSaved}/>      
    <ActualRecipe chosenOption={chosenOption} historyRecipe={historyRecipe} setHistoryRecipe={setHistoryRecipe} setSuccessMessage={setSuccessMessage} setModalActual={setModalActual}/>
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

    <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

    {message != "" && <Text style= {message == 'Ingredient not found'? styles.messageNotFound : styles.successMessage }>{message}</Text>}
    {successMessage != "" && <Text style={[styles.messages,styles.successMessage]}>{successMessage}</Text>}
  

    {result.length>1 && displayOk && 
    <View>
    <Pressable 
      style={styles.buttonClose}
      onPress={deleteSearch}>
      <Text style={styles.textStyleButtonCross}>&#10006;</Text>
    </Pressable>
    <Text style={styles.selectOne}>SELECT ONE INGREDIENT</Text>
    </View>
    }

    {result.length>1 && displayOk && 
      <ScrollView style={styles.scrollView}>
        {result.map((option)=>(
        option.foodNutrients.map((nutrient)=>(
        nutrient.unitName == 'KCAL'&&
        
        <View style={styles.results}>
        <Pressable style={styles.optionResult} onPress={()=>{showInputQty(option, nutrient)}}>
        <Text 
            style={styles.text}
            >Food: {option.description}
        </Text>
        <Text 
            style={styles.text}
            >Category: {option.foodCategory}
        </Text>
        <Text>Energy: {nutrient.value} kcal/100g</Text>
    </Pressable>
    </View>))))} 
    </ScrollView>}
    
   
    <Modal 
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    >
      <View style={styles.centeredView}>
      <View style={styles.modalView}>

      <Pressable
            style={[styles.button, styles.buttonCloseModal]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyleButtonCross}>&#10006;</Text>
    </Pressable>
      <Text style={styles.titleModal}>QUANTITY</Text>
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

    { isNaN(Number(qty)) && <Text style={[styles.messageModal, styles.invalidMessage]}>Invalid quantity provided</Text>}
    {qty == "" && <Text style={styles.messageModal}>Provide a number of grams</Text>}
    </View>
    </View>
    </Modal>

    
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  containerOpacity: {
    flex:1,
    opacity:.2
  },
  container: {
    flex:1,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  optionResult:{
    borderColor:'gray',
    borderStyle:'solid',
    borderRadius:10,
    borderWidth:1,
    padding:13,
    marginBottom:7,
    marginHorizontal:7,
  },

  inputQty:{
    alignSelf:'center',
    borderStyle: "solid",
    borderColor:"black",
    borderWidth:2,
    height:35,
    width:80,
    marginBottom:30,
    borderRadius:5,
  },

  input:{
    borderStyle: "solid",
    borderColor:"black",
    borderWidth:2,
    borderRadius:5,
    width:310,
    height:50,
    marginLeft:5,
    marginRight:10,
  },

  inputPart:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
    gap:5,
    maxHeight:80,
  },

  title:{
    textAlign:'center',
    fontSize:30,
    letterSpacing:5,
    marginBottom:20,
  },
  topBar:{
    height:250,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'space-around',
    gap:100,
  },
  topBarWResults:{
    height:100,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'space-around',
    gap:100,
  },
  scrollView:{
    height:400,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:250,
    width:300,
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
    marginRight:15,
    alignSelf:'flex-end',
  },
  buttonCloseModal:{
    fontSize:25,
    alignSelf:'flex-end',
  },
  buttonSave:{
    borderRadius:10,
    backgroundColor:'#80DC37',
    width:80,
    height:30,
    alignSelf:'center',
    flex:1,
    justifyContent:'center'
  },
  textStyleButton:{
    color:'white',
    textAlign:'center',
  },
  textStyleButtonCross:{
    fontSize:25,
    textAlign:'center',
  },
  titleModal:{
    fontSize:25,
    letterSpacing:3,
    marginBottom:20,
    marginTop:10,
    textAlign:'center',
  },
  textStyleButtonSearching:{
    fontSize:35,
  },
  messageModal:{
    textAlign:'center'
  },
  invalidMessage:{
    color:'red'
  },
  successMessage:{
    color:'#32CD32',
    textAlign:'center',
    fontSize:18,
    marginTop:10,
    marginRight:5
  },
  messageNotFound:{
    textAlign:'center',
    fontSize:18,
    marginTop:10,
    color:'red',
    marginRight:5
  },
  text:{
    marginBottom:10,
  },
  selectOne:{
    fontSize:18,
    textAlign:'center',
    letterSpacing:1,
    marginBottom:10,
  },
  
});



