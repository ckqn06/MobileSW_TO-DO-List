import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert,
    ScrollView, View, Button, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react'
import { db }  from '../firebaseConfig';
import { 
  addDoc, 
  collection, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc,  
  where,
  query } from "firebase/firestore"; 
  
const Main = () => {
  const [addTask, setAddTask] = useState('');
  const [addAge, setAddAge] = useState('');
  const [id, setID] = useState('');
  const [users, setUsers] = useState();

  function changeID() { setID('') }
  useEffect(()=>{changeID()})

  const updateDB = async ()=>{
    try{
      const docRef = doc(db, "Task", id);
      await updateDoc(docRef, {
        addTask: addTask,
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
      const q = await query(collection(db, "Task" ), where('addTask',"==","test23"))
      const singleDoc = await getDocs(q);
      console.log(singleDoc)
    }catch(error){
      console.log(error.message)
    }
  }

  const addtoDB = async ()=>{
    try{
      if ( addTask=="" ) { Alert.alert("주의!", "내용을 적어주세요!", [{ text:"예" }]) }
      else {
        await addDoc(collection(db, "Task"), {
          addTask: addTask,
          addAge: addAge,
          createdAt: new Date(),
        });
        alert("TO-DO List에 추가했습니다.")
        setAddTask("")
        setAddAge("")
        readfromDB()
      }
    }catch(error){
      console.log(error.message)
    }
  }

  const readfromDB = async ()=>{
    try{
      const data = await getDocs(collection(db, "Task"))
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }catch(error){
      console.log(error.message)
    }
  }

  const deletefromDB = async ()=>{
    try{
      const docRef = doc(db, "Task", id);
      await deleteDoc(docRef);
      alert("Deleted!!")
      readfromDB()
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
            <Text style={styles.mainText}>해야 할 일을 TO-DO List에 추가하기</Text>

            <View style = {{flexDirection:'row', alignItems:'center', marginTop:20}}>
              <TextInput
                style = {styles.textInput}
                value={addTask}
                onChangeText={setAddTask}
                placeholder="+ 해야 할 일을 여기다 적어보세요!"/>
              <TouchableOpacity onPress = {addtoDB}>
                <View style = {styles.button}>
                  <Text style = {styles.buttonText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{alignItems:'flex-end', marginTop:30, marginRight:20}}>
            <TouchableOpacity onPress = {readfromDB}>
                <View style = {styles.readButton}>
                  <Text style = {{fontSize:14, fontWeight:'bold'}}>TO-DO List 불러오기</Text>
                </View>
            </TouchableOpacity>   
            </View>         

            <View style={styles.subView}>
                {users?.map((row, idx) => {
                  return (
                    <View style={styles.task}>
                      <Text style={{marginRight:10, fontSize:20, fontWeight:'bold'}}>#{idx+1}</Text>
                      <Text style={{fontSize:20}}>{row.addTask}</Text>
                      <Text>{row.id}</Text>
                      <TouchableOpacity onPress={deletefromDB}>
                          <Image
                            style = {{width:35, height:35}}
                            source = {require('../assets/Image/trash-can.png')}
                            resizeMode = "contain"/>
                      </TouchableOpacity>   
                    </View> ); })}
            </View>

            <View style={styles.subView}>
                        <TextInput
                            placeholder="name"
                            value={addTask}
                            onChangeText={setAddTask}/>
                        <TextInput
                            placeholder="age"
                            value={addAge}
                            onChangeText={setAddAge}/>

                        <Button title="Update Text" onPress={updateDB} />
                        <TextInput
                            placeholder="Updata ID"
                            value={id}
                            onChangeText={setID}/>
                        <TextInput
                            placeholder="name"
                            value={addTask}
                            onChangeText={setAddTask}/>
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
    backgroundColor:'#F6F8FA',
  },
  subView: {
    margin:15,
    backgroundColor:'#FFFFFF',
    borderWidth:3,
    borderRadius:6,
    borderColor:'black'
  },
  
  mainText: {
    marginTop:30,
    marginLeft:20,
    fontSize:20,
    fontWeight:'bold'
  },
  textInput: {
    width:'75%',
    height:40,
    marginLeft:20,
    marginRight:10,
    paddingHorizontal:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'gray',
    backgroundColor:'white'
  },

  button: {
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    borderRadius:50,
    borderWidth:1,
    borderColor:'gray',
    backgroundColor:'#E4F5E9' 
  },
  readButton: {
    padding:10,
    borderRadius:10,
    backgroundColor:'#FFC72C' 
  },
  buttonText: {
    fontSize:20,
  },

  task: {
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    paddingHorizontal:10,
    borderRadius:0,
    borderWidth:1,
    borderColor:'gray',
    backgroundColor:'white'
  }
});

export default Main