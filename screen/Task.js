import { Alert, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from 'react'
import { db }  from '../firebaseConfig';
import { 
  doc,
  updateDoc,
  deleteDoc } from "firebase/firestore"; //firebase에 데이터를 수정 및 삭제하기 위해 불러온다.
  
const Task = ({route}) => {
  const {id} = route.params; //선택한 할 일의 고유 데이터베이스 ID를 저장하기 위한 변수
  const {task} = route.params; //선택한 할 일의 내용을 저장하기 위한 변수
  const [update, setUpdate] = useState(task); //선택한 할 일의 수정할 내용을 저장하기 위한 변수
  const [show, setShow] = useState(true); //특정 상황에서 숨겨진 컴포넌트를 보여주기 위한 변수

  //사용자가 적은 내용을 데이터베이스에 존재하는 데이터의 내용에서 수정하는 함수
  //사용자가 아무 내용도 적지 않았거나 이미 삭제된 데이터를 수정하려 하면 경고문을 출력한다.
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

  //데이터베이스 내에서 사용자가 선택한 할 일을 삭제하는 함수 
  //이미 삭제된 데이터를 삭제하려 하면 경고문을 출력한다.
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

      {/* 사용자가 선택한 할 일의 세부 사항을 출력한다.
          textInput에 내용을 입력하고 '수정적용' button을 누르면 내용이 수정된다. */}
      {/* 사용자가 '삭제하기' button을 누르면 세부 사항에 관한 내용을 숨기고 삭제됐다는 text를 출력한다. */}  
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
          
      {/* 사용자가 적은 내용을 데이터베이스에 존재하는 데이터의 내용에서 수정하는 함수 */}
      <View style={{flexDirection:'row', marginTop:30}}>
        <TouchableOpacity onPress = {updateDB}>
          <View style = {styles.tabButton}>
            <Text style = {{fontSize:20, fontWeight:'bold'}}>수정적용</Text>
          </View>
      </TouchableOpacity>

      {/* 데이터베이스 내에서 사용자가 선택한 할 일을 삭제하는 버튼 */}
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
  mainView: { //화면 전체를 위한 view의 스타일
    flex:1,
    backgroundColor:'#F6F8FA',
  },
  subView: { //할 일의 정보를 위한 view의 스타일
    flex:1,
    marginTop:35,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'#FFFFFF',
    borderWidth:3,
    borderRadius:6,
    borderColor:'black'
  },
  
  header: { //글의 구간을 나누는 text의 스타일
    marginTop:15,
    fontSize:20,
    fontWeight:'bold'
  },
  textInput: { //할 일의 내용을 수정하기 위한 textInput의 스타일
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

  tabButton: { //하단에 존재하는 button의 스타일
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