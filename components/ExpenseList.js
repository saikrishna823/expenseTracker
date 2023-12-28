import {FlatList} from "react-native"
import ExpenseCard from "./ExpenseCard"

function ExpenseList({expenses}) {
  return (
    <FlatList data={expenses} keyExtractor={(item)=>item.id} renderItem={(expense)=><ExpenseCard expense={expense}/>}/>
  )
}

export default ExpenseList