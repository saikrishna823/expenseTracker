import {View,StyleSheet,Text} from "react-native"
import Input from "./Input"
import { useContext, useState } from "react"
import Button from "./Button"
import { ExpensesContext } from "../store/expense-context";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../utils/date";
import { GlobalStyles } from "../constants/styles";
import { storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay"
function ExpenseForm({editableId}) {
const navigation=useNavigation();
const ExpensesCtx=useContext(ExpensesContext)
const [isSubmitting,setIsSubmitting]=useState(false);
const [error,setError]=useState("")
const isEditing=!!editableId;
console.log(editableId)
const editableExpense = isEditing ? ExpensesCtx.expenses.find((expense) => expense.id === editableId) : null;
console.log(editableExpense)
   const [inputs,setInputs]=useState({
    description:{
        value:isEditing?editableExpense.description:" ",
        isValid:true
    },
    amount:{
        value:isEditing?editableExpense.amount.toString():" ",
        isValid:true
    },
    date:{
        value:isEditing?formatDate(editableExpense.date):" ",
        isValid:true
    }
   })
    function inputChangedHandler(inputIdentifier,enteredValue){
        setInputs((currInputs)=>{
            return {...currInputs,
                [inputIdentifier]:{
                    value:enteredValue,
                    isValid:true
                }
            }
        })
    // console.log(enteredValue)
    }
    function cancelHandler(){
        navigation.goBack()
       }
       async function confirmHandler(){
        setIsSubmitting(true)
        const trimmedDate=inputs.date.value.trim()
         const expenseData={
            description:inputs.description.value,
            amount:+inputs.amount.value,
            date:new Date(trimmedDate)
            
         }
        const isDescriptionValid=expenseData.description.trim().length>0
        const isAmountValid=!isNaN(expenseData.amount)&&expenseData.amount>0
        const isdateValid=expenseData.date.toString()!=="Invalid Date";
        // console.log(isdateValid,expenseData.date)
        if(!isAmountValid || !isDescriptionValid || !isdateValid){
            setInputs((currInputs)=>{
            return {
                amount:
                {
                   value:currInputs.amount.value,
                   isValid:isAmountValid
                },
                description:{
                    value:currInputs.description.value,
                    isValid:isDescriptionValid
                },
                date:{
                    value:currInputs.date.value,
                    isValid:isdateValid
                }
                
        };
    })
        }
            else if (isEditing) {
                 const updatedExpenseItem={
                    description:expenseData.description,
                    amount:expenseData.amount,
                    date:expenseData.date
                 }
                 try{
                    ExpensesCtx.updateExpense({ id:editableId,...updatedExpenseItem})
                    await updateExpense(editableId,updatedExpenseItem)
                    navigation.goBack()
                 }
                 catch(error){
                        setError("Could not Update the Expense-Try Again!!!")
                        setIsSubmitting(false)
                 }
                 
               
            }
            
        
        else{
            try{
                const id=await storeExpense(expenseData)
                ExpensesCtx.addExpense({id:id,...expenseData})
                navigation.goBack()
            }
            catch(error){
                setError("Could not Add the Expense-Try Again!!!")
                setIsSubmitting(false)
               
            }
         
        }
      
       }
    const isFormValid=!inputs.amount.isValid || !inputs.description.isValid || !inputs.date.isValid;
    function errorHandler(){
        setError(null)
      }
    if(error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }
    if(isSubmitting){
        return <LoadingOverlay/>
    }
  return (
     <View style={styles.mainContainer}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.dateAmountContainer}>
        <Input label="Amount"
        textInputConfig={{
            keyboardType:"decimal-pad",
            onChangeText:inputChangedHandler.bind(this,"amount"),
            value:inputs.amount.value
        }}
        style={styles.rowInput}
        inValid={!inputs.amount.isValid}
        />
        <Input label="Date"
          textInputConfig={{
            keyboardType:"decimal-pad",
            onChangeText:inputChangedHandler.bind(this,"date"),
            placeholder:"YYYY-MM-DD",
            value:inputs.date.value
          }}
          style={styles.rowInput}
          inValid={!inputs.date.isValid}
        />
         </View>
        <Input label="Description" textInputConfig={{
            keyboardType:"default",
            onChangeText:inputChangedHandler.bind(this,"description"),
            multiline:true,
            value:inputs.description.value
        }}
        inValid={!inputs.description.isValid}
        />
        
          { isFormValid &&<Text style={styles.errorText}>Invalid Input Values- Please check your input values</Text> }
       
        <View style={styles.buttonContainer}>
        <Button  style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button   style={styles.button} onPress={confirmHandler}>{isEditing?"Update":"Add"}</Button>
       </View>
     </View>
  )
}

export default ExpenseForm

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        marginTop:30
    },
    title:{
        color:"white",
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center"
    },
    dateAmountContainer:{
        minWidth:300,
        marginBottom:5,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    rowInput:{
        flex:1
    },
    errorText:{
         color:GlobalStyles.colors.error500,
         margin:8,
         textAlign:"center"

    },
    button:{
        marginHorizontal:8,
        minWidth:120
    },
    buttonContainer:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
    },
})