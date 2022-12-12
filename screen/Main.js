import { Alert, BackHandler, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react'
import { db }  from '../firebaseConfig';
import { 
  addDoc, 
  collection, 
  getDocs } from "firebase/firestore"; 
  
const Main = ({navigation}) => {
  const [addTask, setAddTask] = useState('');
  const [users, setUsers] = useState();

  const addtoDB = async () => {
    try{
      if ( addTask=="" ) { Alert.alert("주의!", "내용을 적어주세요!", [{ text:"예" }]) }
      else {
        await addDoc(collection(db, "Task"), {
          addTask: addTask,
          createdAt: new Date(),
        });
        alert("TO-DO List에 추가했습니다.")
        setAddTask("")
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

  useEffect(() => { readfromDB(); }, [])

  useEffect(() => {
    const backAction = () => { Alert.alert("알림", "정말로 앱을 종료하시겠습니까?",
      [{ text:"아니오", onPress: () => null, style:'cancel' },
       { text:"예", onPress: () => { BackHandler.exitApp() }}]);
       return true; };

    const backHandler = BackHandler.addEventListener( "hardwareBackPress", backAction );
    return () => backHandler.remove() 
  }, [])

  return (
    <View style={styles.mainView}>
      <Text style={styles.mainText}>해야 할 일을 TO-DO List에 추가하기</Text>

      <View style = {{flexDirection:'row', alignItems:'center', marginTop:20}}>
        <TextInput
          style = {styles.textInput}
          value={addTask}
          onChangeText={setAddTask}
          placeholder="+ 해야 할 일을 여기다 적어보세요!"/>
        <TouchableOpacity onPress = {addtoDB}>
          <View style = {styles.addButton}>
            <Text style = {{fontSize:20}}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{alignItems:'flex-end', marginTop:30, marginRight:20}}>
        <TouchableOpacity onPress = {readfromDB}>
          <View style = {styles.readButton}>
            <Text style = {{fontSize:14, fontWeight:'bold'}}>새로고침</Text>
          </View>
        </TouchableOpacity>   
      </View>             

      <View style={styles.subView}>
        <ScrollView style ={{width:"100%"}}>
          {users?.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => { navigation.navigate('Task', { id: item.id, task: item.addTask })}}>
                <View style={styles.task}>
                  <Text style={{marginRight:10, fontSize:20, fontWeight:'bold'}}>#{index+1}</Text>
                  <Text style={{marginRight:40, fontSize:20}} numberOfLines={1} ellipsizeMode="tail">{item.addTask}</Text>
                </View>
              </TouchableOpacity>   
            ); })}
        </ScrollView>
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

  addButton: {
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