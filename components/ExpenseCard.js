import {View,Text,StyleSheet, Pressable} from "react-native"
import { GlobalStyles } from "../constants/styles"
import { formatDate } from "../utils/date";
import { useNavigation } from "@react-navigation/native";
function ExpenseCard({expense}) {
    const navigation=useNavigation();
function onPressHandler(){
  navigation.navigate(
    "ManageExpense",{
      expenseId:expense.item.id
    }
  )
}
  return (
        <Pressable android_ripple={{color:GlobalStyles.colors.primary100}} style={styles.rootContainer} onPress={onPressHandler}>
        <View>
          <Text style={styles.descriptionStyle}>{expense.item.description}</Text>
          <Text style={{color:GlobalStyles.colors.primary50}}>{formatDate(expense.item.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
           <Text style={[styles.text,styles.price]}>{expense.item.amount.toFixed(2)}</Text>
        </View>
        </Pressable>
  )
}

export default ExpenseCard

const styles=StyleSheet.create({
    rootContainer:{
        backgroundColor:GlobalStyles.colors.primary400,
        marginVertical:10,
        marginHorizontal:18,
        padding:10,
        borderRadius:5,
        flexDirection:"row",
        justifyContent:"space-between",
        elevation:3
    },
    descriptionStyle:{
       fontSize:16,
       marginBottom:4,
       color:GlobalStyles.colors.primary50,
       fontWeight:"bold"
    },
    amountContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:"white",
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        minWidth:80
    },
    price:{
        color:GlobalStyles.colors.primary500,
        fontWeight:"bold"
    }
})