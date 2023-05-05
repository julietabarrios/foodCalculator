import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Image, Modal, Pressable } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavedRecipes from './SavedRecipes';
import ActualSearch from './ActualRecipe';


const Stack = createNativeStackNavigator();


export default function Home({navigation}) {
    const [search, setSearch] = useState('')
    const [result, setResult]=useState([])
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(
        () => {
    const searchFood = async ()=>{
        try{
          const response = await axios.post(`https://api.nal.usda.gov/fdc/v1/foods/search?3nfVd5dGrcppdxcvsNUAh8ZqVeE7xZBfeXMLBZUq`,{
            "query": "Cheddar cheese",
            "dataType": [
              "Foundation",
              "SR Legacy"
            ],
            "pageSize": 25,
            "pageNumber": 2,
            "sortBy": "dataType.keyword",
            "sortOrder": "asc",
            "brandOwner": "Kar Nut Products Company"
          })
          setResult(response)
        }
        catch(error){
          console.log(error);
        }
      }
    searchFood()
  },[search]);

  
    return (
    <SafeAreaView style={styles.container}>
    
    <SavedRecipes/>

      <Text style={styles.title}>Search a food or ingredient</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        value={search}
        onSubmitEditing={(event) => setSearch(event.nativeEvent.text)}/>

        <Text>{result}</Text>

    <ActualSearch/>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
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



