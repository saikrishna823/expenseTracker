import { Pressable, StyleSheet,View } from "react-native"
import {Ionicons} from "@expo/vector-icons"
function IconButton({color,size,icon,onPress}) {
  return (
    <Pressable onPress={onPress} style={({pressed})=>pressed?styles.pressed:null}>
        <View  style={styles.buttonContainer}>
        <Ionicons name={icon} color={color} size={size}/>
        </View>
    </Pressable>
  )
}

export default IconButton

const styles=StyleSheet.create({
  buttonContainer:{
    borderRadius:24,
    padding:6,
    margin:8
  },
  pressed:{
    opacity:0.75
  }
})