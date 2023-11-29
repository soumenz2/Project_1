import react,{useState} from "react";
import {View, Button,StyleSheet} from 'react-native';
import { RadioButton, Text } from 'react-native-paper';



const RadioButtonComponent =({ options, onValueChange, value })=>{
    const [status,setStatus] =  useState("")
    return (
      <View >
        <Text>Select an option:</Text>

        <RadioButton.Group onValueChange={onValueChange} value={value}>
          <View style={styles.radioButtonContainer}>
            {options.map((option, index) => (
              <RadioButton.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </View>
        </RadioButton.Group>

    
      </View>
    );

}
export default RadioButtonComponent;
const styles = StyleSheet.create({
  
    radioButtonContainer: {
      flexDirection: 'row',
    },
  });