import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screen/Main';
import Task from './screen/Task';
import Complete from './screen/Complete';
  
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#00994C'/>
      <Stack.Navigator screenOptions={{headerTitleAlign:'center', headerTitleStyle:{fontWeight:'bold'},
        headerStyle:{backgroundColor:'#00994C', shadowColor:"#000", shadowOffset:{width:10, height:10}, shadowOpacity:0.5, shadowRadius:10}}}>
        <Stack.Screen name='Main' component={Main} options={{title:'TO-DO List'}}/>
        <Stack.Screen name='Task' component={Task} options={{title:'TO-DO List'}}/>
        <Stack.Screen name='Complete' component={Complete} options={{title:'TO-DO List'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}