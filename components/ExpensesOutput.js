import {View,StyleSheet,Text} from "react-native"
import { GlobalStyles } from "../constants/styles";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

function ExpensesOutput({expenses,expensesPeriod,fallBackText}) {
    let Content=<Text style={styles.infoText}>{fallBackText}</Text>
    if(expenses.length>0){
        Content= <ExpenseList expenses={expenses}/>
    }
  return (
    <View style={styles.rootContainer}>
       <ExpenseSummary expenses={expenses} periodName={expensesPeriod}/>
            {Content}
    </View>
  );
}

export default ExpensesOutput

const styles=StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:GlobalStyles.colors.primary700,
    },
    infoText:{
        color:"white",
        marginTop:32,
        fontSize:16,
        textAlign:"center"
    }
})