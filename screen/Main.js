import { Alert, BackHandler, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react'
import { db }  from '../firebaseConfig'; //firebase에서 데이터베이스 불러오기
import { 
  addDoc, 
  collection, 
  getDocs } from "firebase/firestore"; //firebase에 데이터를 추가 및 읽기 위해 불러온다.
  
const Main = ({navigation}) => {
  const [addTask, setAddTask] = useState(''); //리스트에 추가할 할 일을 저장하기 위한 변수
  const [users, setUsers] = useState(); //데이터베이스 내의 유저 값을 저장하기 위한 변수

  //사용자가 적은 내용을 데이터베이스에 추가하는 함수
  //사용자가 아무 내용도 적지 않았다면 경고문을 출력한다.
  //추가를 정상적으로 끝냈다면 readfromDB 함수를 실행하여 데이터를 읽어들인다.
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

  //데이터베이스 내의 데이터를 읽어들이는 함수
  const readfromDB = async ()=>{
    try{
      const data = await getDocs(collection(db, "Task"))
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }catch(error){
      console.log(error.message)
    }
  }

  //화면을 처음 실행할 때 readfromDB 함수를 실행하여 데이터베이스 내의 할 일 리스트를 불러온다.
  useEffect(() => { readfromDB(); }, [])

  //만약 사용자가 Main 화면 내에서 뒤로가기를 누르면 앱 종료를 묻는 알림을 출력한다.
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

        {/* 데이터베이스에 해야 할 일을 추가하는 버튼 */}
        <TouchableOpacity onPress = {addtoDB}>
          <View style = {styles.addButton}>
            <Text style = {{fontSize:20}}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 데이터베이스 내에 존재하는 데이터를 불러오는 버튼 */}
      <View style={{alignItems:'flex-end', marginTop:30, marginRight:20}}>
        <TouchableOpacity onPress = {readfromDB}>
          <View style = {styles.readButton}>
            <Text style = {{fontSize:14, fontWeight:'bold'}}>새로고침</Text>
          </View>
        </TouchableOpacity>   
      </View>             

      {/* 불러온 데이터를 TO-DO List 내에 추가하여 보여준다. */}
      {/* TO-DO List에 추가된 할 일을 선택하면 세부 정보 확인 화면으로 넘어간다.
          이 때, 해당 일의 고유 ID와 저장된 내용을 같이 보낸다.*/}
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
  mainView: { //화면 전체를 위한 view의 스타일
    flex:1,
    backgroundColor:'#F6F8FA',
  },
  subView: { //할 일 리스트가 위치한 view의 스타일
    flex:1,
    margin:15,
    backgroundColor:'#FFFFFF',
    borderWidth:3,
    borderRadius:6,
    borderColor:'black'
  },
  
  mainText: { //상단에 존재하는 text의 스타일
    marginTop:30,
    marginLeft:20,
    fontSize:20,
    fontWeight:'bold'
  },
  textInput: { //리스트에 할 일을 추가하기 위한 textInput의 스타일
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

  addButton: { //리스트에 할 일을 추가하기 위한 button의 스타일
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    borderRadius:50,
    borderWidth:1,
    borderColor:'gray',
    backgroundColor:'#E4F5E9' 
  },
  readButton: { //새로고침 button을 위한 스타일
    padding:10,
    borderRadius:10,
    backgroundColor:'#FFC72C' 
  },

  task: { //리스트 내에 존재하는 할 일의 view의 스타일
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