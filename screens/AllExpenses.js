
import { useContext } from "react"
import ExpensesOutput from "../components/ExpensesOutput"
import { ExpensesContext } from "../store/expense-context"

function AllExpenses() {
  const ExpensesCtx=useContext(ExpensesContext)
  return (
    <ExpensesOutput fallBackText={ExpensesCtx.expenses.length>0?null:"No Expenses"} expenses={ExpensesCtx.expenses} expensesPeriod="All Expenses"/>
  )
}

export default AllExpenses