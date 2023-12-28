import { StyleSheet, View} from "react-native"
import { useContext, useLayoutEffect,useState } from "react";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ExpenseForm";
import { deleteExpense } from "../utils/http";
function ManageExpense({route,navigation}) {
  const editableId=route.params?.expenseId;
  const [error,setError]=useState("")
  const [isSubmitting,setIsSubmitting]=useState(false);
  const isEditing=!!editableId;
  const ExpensesCtx=useContext(ExpensesContext)
   useLayoutEffect(()=>{
    navigation.setOptions({
      title:isEditing?"Update Expense":"Add  Expense"
    })
   },[isEditing,navigation])
   async function deleteExpenseHandler() {
    try {
      setIsSubmitting(true);
      //console.log(editableId);
      //await deleteExpense(editableId);
      ExpensesCtx.deleteExpense(editableId);
      navigation.goBack();
    } catch (error) {
      setError("Could not Delete Expense-Try Again Later !!!");
      setIsSubmitting(false);
    }
  }
  function errorHandler(){
    setError(null)
  }
  if(error && !isSubmitting){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }
  
  return (
     <View style={styles.container}>
        <ExpenseForm editableId={editableId}/>
       
      
        {
          isEditing &&  <View style={styles.deleteContainer}><IconButton icon="trash" color={GlobalStyles.colors.error500} size={35} onPress={deleteExpenseHandler}/>  </View>
        }
     
     </View>
  )
}

export default ManageExpense

const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary800
  },
 
  deleteContainer:{
    marginTop:16,
    paddingTop:8,
    borderTopWidth:2,
    borderColor:GlobalStyles.colors.primary200,
    alignItems:"center"

  }
})