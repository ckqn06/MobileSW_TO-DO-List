import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screen/Main'; //Main화면 불러오기
import Task from './screen/Task'; //할 일 상세 정보 확인 화면 불러오기
  
const Stack = createStackNavigator(); //화면(screen) 간 이동을 위한 Stack 정의

export default function App() {
  LogBox.ignoreAllLogs(); //모바일 기기 내에서 경고 메시지 생략

  return (
    <NavigationContainer>
      {/* 앱 상태바의 색깔을 초록색으로 변경 */}
      <StatusBar backgroundColor='#00994C'/>

      {/* 화면 위에 존재하는 헤더의 스타일을 변경해준다. */}
      <Stack.Navigator screenOptions={{headerTitleAlign:'center', headerTitleStyle:{fontWeight:'bold'},
        headerStyle:{backgroundColor:'#00994C', shadowColor:"#000", shadowOffset:{width:10, height:10}, shadowOpacity:0.5, shadowRadius:10}}}>

        {/* Main과 Task 화면을 불러온다. */}
        <Stack.Screen name='Main' component={Main} options={{title:'TO-DO List'}}/>
        <Stack.Screen name='Task' component={Task} options={{title:'TO-DO List'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}