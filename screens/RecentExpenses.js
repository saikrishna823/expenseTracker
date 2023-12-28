
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay"
function RecentExpenses() {
  const ExpensesCtx=useContext(ExpensesContext);
  const [error,setError]=useState('');
  const [isFetching,setIsFetching]=useState(true)
  useEffect(()=>{
     async function  getExpenses() {
      try{
        const expenses=await fetchExpenses();
        ExpensesCtx.setAllExpenses(expenses)
      }
      catch(error){
       setError("Could not Fetch Expenses")
      }
       setIsFetching(false)
        
     
    }
    getExpenses()
  },[])
  
  const recentExpenses=ExpensesCtx.expenses.filter((expense)=>{
    const today=new Date();
    const daysAgo=today.getDate()-7;
    return expense.date.getDate()>daysAgo && expense.date.getFullYear()===today.getFullYear() && expense.date.getMonth()===today.getMonth();
  })
  function errorHandler(){
    setError(null)
  }
  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }
  return (
      isFetching ?<LoadingOverlay/> :<ExpensesOutput fallBackText={recentExpenses.length>0?null:"No Recent Expenses"} expenses={recentExpenses} expensesPeriod="Recent Expenses"/>
     
  )
}

export default RecentExpenses