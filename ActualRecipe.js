import React, {useState,useEffect} from 'react'
import {Modal, Text, SafeAreaView, Pressable, StyleSheet, View} from 'react-native'
import { Button } from 'react-native-paper';


const ActualSearch = ({chosenOption}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [actualRecipe, setActualRecipe]=useState([])

    const openCloseModal =()=>{
        setModalVisible(!modalVisible)
    }

    useEffect(
      () => {
        const temp = [...actualRecipe]
        temp.push(chosenOption)
        setActualRecipe(temp)
      },[chosenOption]);


      const displayActualRecipe = () => (
        actualRecipe.map((food, i)=>(
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
            <Button title='Delete from receipe' onPress={()=>{deleteFromReceipe(i)}}/>
            
        </View>
        ))
      )

      const deleteFromReceipe = (i)=>{
        const temp=[...actualRecipe]
        temp.splice(i,1)
        setActualRecipe(temp)
      }

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
          <Text style={styles.modalText}>Your saved ingredientes for your actual recipe</Text>
          {displayActualRecipe()}
          <Text>{actualRecipe.reduce((total,receipe)=>(total + receipe.kcal),0)}</Text>
        <Button title='Save receipe'/>
        <Button title='Delelte all the receipe'/>
        </View>
      </Modal>

    </SafeAreaView>
    )
}

export default ActualSearch

const styles = StyleSheet.create({
    button:{
      borderRadius: 20,
      padding: 10,
      elevation: 2, 
      backgroundColor: '#C71585',
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