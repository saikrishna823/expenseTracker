import {View,Text,TextInput,StyleSheet} from "react-native"
import { GlobalStyles } from "../constants/styles"

function Input({label,style,textInputConfig,inValid}) {
    const inputStyles=[styles.input]
    if(textInputConfig.multiline){
       inputStyles.push(styles.inputMultiline)
    }
    if(inValid){
        inputStyles.push(styles.invalidText)
    }
  return (
   <View style={[styles.inputContainer,style]}>
     <Text style={[styles.label,inValid && styles.invalidLabel]}>{label}</Text>
     <TextInput style={inputStyles} {...textInputConfig}/>
   </View>
  )
}

export default Input

const styles=StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
      
    },
    label:{
        fontSize:12,
        color:GlobalStyles.colors.primary100
    },
    input:{
        marginBottom:4,
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        color:GlobalStyles.colors.primary700
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:"top"
    },
    invalidLabel:{
         color:GlobalStyles.colors.error500
    },
    invalidText:{
        backgroundColor:GlobalStyles.colors.error50
    }
})