import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Image, Modal, Pressable } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavedRecipes from './SavedRecipes';
import ActualRecipe from './ActualRecipe';


export default function Home() {
    const [search, setSearch] = useState('')
    const [result, setResult]=useState([])
    const [chosenOption,setChosenOption]=useState({
        description:'',
        category:'',
        kcal:0
    })
    const [historyRecipe, setHistoryRecipe]= useState([])

  const saveInActualSearch = (option, nutrient)=>{
    setChosenOption({
        description: option.description,
        category:option.foodCategory,
        kcal:nutrient.value
    })
  }

  const showResult = async () => {
    try{
        const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=3nfVd5dGrcppdxcvsNUAh8ZqVeE7xZBfeXMLBZUq&query=${search}`)
        setResult(response.data.foods)
        console.log(response.data.foods)
      }
      catch(error){
        console.log(error);
      }
    }
  
    return (
    <SafeAreaView style={styles.container}>
    
    <SavedRecipes historyRecipe={historyRecipe} setHistoryRecipe={setHistoryRecipe}/>
    <ActualRecipe chosenOption={chosenOption} setChosenOption={setChosenOption} setHistoryRecipe={setHistoryRecipe}/>

      <Text style={styles.title}>Search a food or ingredient</Text>

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

    {result.length>1 && result.map((option)=>(
        option.foodNutrients.map((nutrient)=>(
        nutrient.unitName == 'KCAL'&&
        <Pressable style={styles.optionResult} onPress={()=>{saveInActualSearch(option, nutrient)}}>
        <Text 
            style={styles.text}
            >Food: {option.description}
        </Text>
        <Text 
            style={styles.text}
            >Category: {option.foodCategory}
        </Text>
        <Text>{nutrient.value} {nutrient.unitName}</Text>
    </Pressable>))))}

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
    height:50,
    marginTop:20,
    marginLeft:5,
    marginRight:5,
  },
  title:{
    textAlign:'center',
    fontSize:30,
  },
});



