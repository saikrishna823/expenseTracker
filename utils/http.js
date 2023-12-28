import Axios from "axios"

const URL="https://expensetracker-33261-default-rtdb.firebaseio.com"
export async function storeExpense(expenseData){
  const response= Axios.post(`${URL}/expenses.json`,expenseData)
  const id=(await response).data.name;
  return id
}

export async function fetchExpenses(){
   const response= Axios.get(`${URL}/expenses.json`);
   const expenses=[]
   for(const key in (await response).data){
    const expenseObj={
        id:key,
        description:(await response).data[key].description,
        amount:(await response).data[key].amount,
        date:new Date((await response).data[key].date)
    }
    expenses.push(expenseObj)
   }
   return expenses
}

export  function updateExpense(id,expenseData){
   return  Axios.put(`${URL}/expenses/${id}.json`,expenseData)
}

export function deleteExpense(id){
    return  Axios.delete(`${URL}/expenses/${id}.json`)
}