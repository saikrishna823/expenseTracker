import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import {Ionicons} from "@expo/vector-icons"
import ManageExpense from './screens/ManageExpense';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/IconButton';
import ExpenseContextProvider from './store/expense-context';
import { Text } from 'react-native';
const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

function BottomNavigator(){
  return <Tab.Navigator
  screenOptions={({navigation})=>({
    headerStyle:{
      backgroundColor:GlobalStyles.colors.primary500
},
headerTintColor:"white",
headerTitleAlign:"center",

tabBarStyle:{
   backgroundColor:GlobalStyles.colors.primary500
},
tabBarActiveTintColor:GlobalStyles.colors.accent500,
headerRight:({tintColor})=><IconButton icon="add" color={tintColor} size={24} onPress={()=>navigation.navigate("ManageExpense")}/>
   })}

  >
  <Tab.Screen 
  name="RecentExpenses" 
  component={RecentExpenses}
  options={{
    title:"Recent Expenses",
    tabBarLabel:"Recent",
    tabBarIcon:({color,size})=><Ionicons name='hourglass'color={color} size={size}/>
  }}
  />
  <Tab.Screen name="AllExpenses" component={AllExpenses}
  options={{
    title:"All Expenses",
    tabBarLabel:"Total",
    tabBarIcon:({color,size})=><Ionicons name="calendar" color={color} size={size}/>
  }}
  />
</Tab.Navigator>
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerStyle:{
              backgroundColor:GlobalStyles.colors.primary500
            },
            headerTintColor:"white"
          }}
        >
          <Stack.Screen name="ExpensesScreen" component={BottomNavigator} options={{
            headerShown:false,
  
          }}/>
          <Stack.Screen name="ManageExpense" component={ManageExpense}
          options={{
            presentation:"modal"
          }}


          />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvider>
      {/* <Text>Hello World</Text> */}
      </>
  );
}
