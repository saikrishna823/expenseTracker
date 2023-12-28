import { createContext, useState } from "react";
export const ExpensesContext=createContext({
    expenses:[],
    addExpense:(expense)=>{},
    deleteExpense:(id)=>{},
    updateExpense:(expense)=>{},
    setAllExpenses:(expenses)=>{}
})

function ExpenseContextProvider({children}){
    const [expenses,setExpenses]=useState([]);

    function addExpense(expense){
        setExpenses((currExpenses)=>[expense,...currExpenses])
    }
    function deleteExpense(id){
        setExpenses((currExpenses)=>currExpenses.filter((expense)=>expense.id!==id))
    }
    function updateExpense(updatableExpense){
        const updatableExpenseIndex=expenses.findIndex((expense)=>expense.id===updatableExpense.id)
        const updatedExpenses=[...expenses];
        updatedExpenses[updatableExpenseIndex]=updatableExpense;
         setExpenses(updatedExpenses);
    }
    function setAllExpenses(expenses){
        const inverted=expenses.reverse();
           setExpenses(inverted)
    }
    const value={
        expenses:expenses,
        addExpense:addExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense,
        setAllExpenses:setAllExpenses
    }
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpenseContextProvider