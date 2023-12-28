import {View,Text,StyleSheet} from "react-native"
import { GlobalStyles } from "../constants/styles"

function ExpenseSummary({periodName,expenses}) {
    const expensesTotal=expenses.reduce((sum,expense)=>sum+expense.amount,0);
  return (
    <View style={styles.summaryStyle}>
            <Text style={styles.noteStyle}>{periodName}</Text>
            <Text style={styles.expenseTotalStyle}>${expensesTotal.toFixed(2)}</Text>
        </View>
  )
}

export default ExpenseSummary

const styles=StyleSheet.create({
    summaryStyle:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginVertical:18,
        marginHorizontal:18,
        backgroundColor:GlobalStyles.colors.primary50,
        padding:10,
        borderRadius:5,
    },
    noteStyle:{
        color:GlobalStyles.colors.primary400,
        fontSize:15,
    },
    expenseTotalStyle:{
        fontWeight:"bold",
        fontSize:20,
        color:GlobalStyles.colors.primary500
    }
})