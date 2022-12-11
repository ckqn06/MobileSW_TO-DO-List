import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
    ScrollView, View, Button, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {db}  from '../firebaseConfig';
import { 
  addDoc, 
  collection, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc,  
  where,
  query } from "firebase/firestore"; 
  
const Main = (props) => {
  const [addName, setAddName] = useState('');
  const [addAge, setAddAge] = useState('');
  const [id, setID] = useState('');
  const [users, setUsers] = useState();
  const deletefromDB = async ()=>{
    try{
      const docRef = doc(db, "user", id);
      await deleteDoc(docRef);
      alert("Deleted!!")
      readfromDB()
    }catch(error){
      console.log(error.message)
    }
  }

  const updateDB = async ()=>{
    try{
      const docRef = doc(db, "user", id);
      await updateDoc(docRef, {
        addName: addName,
        addAge: addAge
      });
      alert("Updated!!")
      readfromDB()
    }catch(error){
      console.log(error.message)
    }
  }

  const queryDB = async ()=>{
    try{
      const q = await query(collection(db, "user" ), where('addName',"==","test23"))
      const singleDoc = await getDocs(q);
      console.log(singleDoc)
    }catch(error){
      console.log(error.message)
    }
  }

  const readfromDB = async ()=>{
    try{
      const data = await getDocs(collection(db, "user" ))
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }catch(error){
      console.log(error.message)
    }
  }

  const addtoDB = async ()=>{
    try{
      await addDoc(collection(db, "user" ), {
        addName: addName,
        addAge: addAge,
        createdAt: new Date(),
      });
      alert("Added!!")
      setAddName("")
      setAddAge("")
    }catch(error){
      console.log(error.message)
    }
  }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainView}> 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
          <ScrollView style ={{width:"100%"}}>
            <View style={styles.mainView}>
              <View style={{flexDirection:'row'}}>

              <TouchableOpacity onPress = {() => { props.navigation.navigate("Main") }}>
              <View style = {styles.yetButton}>
                <Text style = {styles.yetButtonText}>미달성</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => { props.navigation.navigate("All") }}>
              <View style = {styles.yetButton}>
                <Text style = {styles.yetButtonText}>모두</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => { props.navigation.navigate("Complete") }}>
              <View style = {styles.yetButton}>
                <Text style = {styles.yetButtonText}>달성</Text>
              </View>
            </TouchableOpacity>

              </View>
                    <View style={styles.subView}>
                        <Text>complete</Text>

                        <Image
                          style = {{width:200, height:200}}
                          source = {require('../assets/Image/hand.png')}
                          resizeMode = "contain"/>

                        <TextInput
                            placeholder="name"
                            value={addName}
                            onChangeText={setAddName}/>
                        <TextInput
                            placeholder="age"
                            value={addAge}
                            onChangeText={setAddAge}/>

                        <Button title="Add Text" onPress={addtoDB}/>
                        <Button title="Read Text" onPress={readfromDB}/>
      
                        {users?.map((row, idx) => {
                            return (
                                <>
                                <Text>User- {idx}</Text>
                                <Text>{row.id}</Text>
                                <Text>{row.addName}</Text>
                                <Text>{row.addAge}</Text>
                                </> ); })}

                        <Button title="Update Text" onPress={updateDB} />
                        <TextInput
                            placeholder="Updata ID"
                            value={id}
                            onChangeText={setID}/>
                        <TextInput
                            placeholder="name"
                            value={addName}
                            onChangeText={setAddName}/>
                        <TextInput
                            placeholder="age"
                            value={addAge}
                            onChangeText={setAddAge}/>
      
                        <Button title="Delete Text" onPress={deletefromDB} />
                        <TextInput
                            placeholder="Delete ID"
                            value={id}
                            onChangeText={setID}/>
                    </View>
                </View>
          </ScrollView>
        </TouchableWithoutFeedback> 
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex:1,
    alignItems:'center',
    backgroundColor:'#205C40',
  },
  subView: {
    margin:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FFFFFF',
    borderWidth:3,
    borderRadius:6,
    borderColor:'black'
  },

  image: {
    marginTop:50,
    marginBottom:50,
    width:300,
    height:300
  },

  yetButton: {
    alignItems:'center',
    padding:10,
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'#B3B68A' 
  },
  yetButtonText: {
    fontSize:30,
  }
});

export default Main