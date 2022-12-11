import { BackHandler, Alert, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screen/Main';
import All from './screen/All';
import Complete from './screen/Complete';
  
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const backAction = () => { Alert.alert("알림", "정말로 앱을 종료하시겠습니까?",
      [{ text:"아니오", onPress: () => null, style:'cancel' },
       { text:"예", onPress: () => { BackHandler.exitApp() }}]);
       return true; };

    const backHandler = BackHandler.addEventListener( "hardwareBackPress", backAction );
    return () => backHandler.remove() 
  }, [])

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#00994C'/>
      <Stack.Navigator screenOptions={{headerTitleAlign:'center', headerTitleStyle:{fontWeight:'bold'},
        headerStyle:{backgroundColor:'#00994C', shadowColor:"#000", shadowOffset:{width:10, height:10}, shadowOpacity:0.5, shadowRadius:10}}}>
        <Stack.Screen name='Main' component={Main} options={{title:'TO-DO List'}}/>
        <Stack.Screen name='All' component={All} options={{title:'TO-DO List'}}/>
        <Stack.Screen name='Complete' component={Complete} options={{title:'TO-DO List'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}