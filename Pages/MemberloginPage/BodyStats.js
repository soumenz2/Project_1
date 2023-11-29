import React,{useState} from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setBodyStats } from "../../src/Reducer/BodyStatsSlice";

import {
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



const Bodystats=({navigation})=>{

    const [formData2, setFormData] = useState({
    Height:'',
    Weight:'',
    Blood_group:'',
    Date_of_measurement:'',
      });
  const dispatch = useDispatch();
 // const formData2 = useSelector((state)=>state.bodyStatsData);
      
      const handleInputChange=(feildNmae,value)=>{
          setFormData({...formData2,[feildNmae]:value})
      }
    //   const handleSubmit=()=>{
    //     console.log(formData)
    //   }
    
      const onNextAction= async()=>{
        dispatch(setBodyStats(formData2))
        
        navigation.navigate('Membership Stats')
      }

    return(
        <View style={{width:"100%",height:"10"}}>
            <TextInput
        style={{borderWidth:1,borderColor:"#000",height:30}}
       
        placeholder="Height"
        onChangeText={(value)=>handleInputChange("Height",value)}
         value={formData2.Height}
      />
           <TextInput
        style={{borderWidth:1,borderColor:"#000",height:30}}
        placeholder="Weight"
        onChangeText={(value)=>handleInputChange("Weight",value)}
         value={formData2.Weight}
      />
           <TextInput
        style={{borderWidth:1,borderColor:"#000",height:30}}
        name="Email"
        placeholder="Blood Group"
        onChangeText={(value)=>handleInputChange("Blood_group",value)}
         value={formData2.Blood_group}
      />
 
      <TextInput
        style={{borderWidth:1,borderColor:"#000",height:30}}
        placeholder="Date of Measurement"
        onChangeText={(value)=>handleInputChange("Date_of_measurement",value)}
         value={formData2.Date_of_measurement}
      />
     
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
           
            <View>
             <Button title="Next" onPress={onNextAction} />
            </View>
        </View>
    )
}
export default Bodystats;