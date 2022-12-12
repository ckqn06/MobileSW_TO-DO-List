import { Alert, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from 'react'
import { db }  from '../firebaseConfig';
import { 
  doc,
  updateDoc,
  deleteDoc } from "firebase/firestore"; 
  
const Task = ({route}) => {
  const {id} = route.params;
  const {task} = route.params;
  const [update, setUpdate] = useState(task);
  const [show, setShow] = useState(true); 

  const updateDB = async ()=>{
    try{
      if(show == false) { Alert.alert("주의!", "이미 삭제된 일입니다.", [{ text:"예" }]) }
      else if (update == '') {
        Alert.alert("주의!", "내용을 적어주세요!", [{ text:"예" }])
      }
      else {
        const docRef = doc(db, "Task", id);
        await updateDoc(docRef, { addTask: update });
        Alert.alert("알림", "성공적으로 수정했습니다.", [{ text:"예" }])
      }
    }catch(error){
      console.log(error.message)
    }
  }

  const deletefromDB = async ()=>{
    try{
      if(show == false) { Alert.alert("주의!", "이미 삭제된 일입니다.", [{ text:"예" }]) }
      else {
        const docRef = doc(db, "Task", id);
        await deleteDoc(docRef);
        Alert.alert("알림", "성공적으로 삭제했습니다.", [{ text:"예" }])
        setShow(false)
      }
    }catch(error){
      console.log(error.message)
    }
  }

  return (
    <View style={styles.mainView}>
      {show ? (
        <View style={styles.subView}>
          <ScrollView style ={{width:"100%"}}>
            <View style={{alignItems:'center', marginLeft:20, marginRight:20}}>
              <Text style={styles.header}>== 해야 할 일 ==</Text>
              <Text style={{marginTop:10, marginBottom:30, fontSize:20}}>{task}</Text>

              <Text style={styles.header}>== 내용 수정하기 ==</Text>
              <TextInput
                style={styles.textInput}
                placeholder="수정하고 싶은 내용을 입력해주세요."
                onChangeText={setUpdate}/>
              </View>
          </ScrollView>
        </View> ): 

        <View style={styles.subView}>
          <ScrollView style ={{width:"100%"}}>
            <View style={{alignItems:'center', marginTop:230}}>
              <Text style={styles.header}>TO-DO List에서 삭제된 일입니다.</Text>
            </View>
          </ScrollView>
        </View> }
          
      <View style={{flexDirection:'row', marginTop:30}}>
        <TouchableOpacity onPress = {updateDB}>
          <View style = {styles.tabButton}>
            <Text style = {{fontSize:20, fontWeight:'bold'}}>수정적용</Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {deletefromDB}>
        <View style = {styles.tabButton}>
          <Text style = {{fontSize:20, fontWeight:'bold'}}>삭제하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex:1,
    backgroundColor:'#F6F8FA',
  },
  subView: {
    flex:1,
    marginTop:35,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'#FFFFFF',
    borderWidth:3,
    borderRadius:6,
    borderColor:'black'
  },
  
  header: {
    marginTop:15,
    fontSize:20,
    fontWeight:'bold'
  },
  textInput: {
    width:'90%',
    height:40,
    marginTop:15,
    marginBottom:30,
    paddingHorizontal:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'gray',
    backgroundColor:'white'
  },

  tabButton: {
    alignItems:'center',
    justifyContent:'center',
    width:180,
    padding:10,
    borderWidth:1,
    borderColor:'gray',
    backgroundColor:'#FFC72C'
  }
});

export default Task