import React,{useState} from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {setMembershipStates} from '../../src/Reducer/MembershipSlice'

import {
    Text,
    View,
    TextInput,
    Button
} from 'react-native';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const MembershipPage = ({navigation}) => {
    // const route = useRoute()
    // const { params } = route;
    // const formData1 = params ? params.formData1 : null;
    // const formData2 = params ? params.formData2 : null;
    
   
    const [formData3, setFormData] = useState({
        Plan: 'Gold',
        startDate: '',
        Discount: ''
    });
    const dispatch = useDispatch();
    const formData1=useSelector((state)=>state.basicdata)
    const formData2 = useSelector((state)=>state.bodyStatsData);
    //const formData3=useSelector((state)=>state.membershipdata)
    const handleInputChange = (feildNmae, value) => {
        setFormData({ ...formData3, [feildNmae]: value })

        //dispatch(setMembershipSates({ ...formData3, [feildNmae]: value }))
        
    }
    const saveFormDataToStorage = async (tempFinalList) => {
        try {
          await AsyncStorage.setItem("userData", JSON.stringify(tempFinalList));
        } catch (error) {
          console.error("Error saving data to AsyncStorage:", error);
        }
      };
    const handleSubmit =async () => {
        console.log("------------------------------redux state data--------------------------")
        console.log(formData1)
        console.log(formData2)
        console.log("------------------------------redux state data end --------------------------")
        setMembershipStates(formData3)
        
        const parsedData = {
            basicData:formData1,
            bodyStatsData: formData2,
            membershipData:formData3,
           
          };
  
          
          const tempList=await AsyncStorage.getItem("userData")
          const parsedtempList = tempList ? JSON.parse(tempList) : [];
          const tempFinalList=[...parsedtempList,parsedData]
        

          await saveFormDataToStorage(tempFinalList);
        console.log("--------------- start whole data--------")
         console.log(tempList)
        console.log("--------------- startWhole data--------")
        navigation.navigate('MembersPage')
    }
    return (
        <View>
            <View>
                <Text>Select Option:</Text>
                <Picker
                    selectedValue={formData3.Plan}

                    onValueChange={(Value) => handleInputChange("Plan",Value)}
                >
                    
                    <Picker.Item label="Gold" value="Gold" />
                    <Picker.Item label="Platinum" value="Platinum" />
                    <Picker.Item label="Titanium" value="Titaniuim" />
                </Picker>
                <TextInput
                    style={{ borderWidth: 1, borderColor: "#000", height: 30 }}
                    placeholder="Start date"
                    onChangeText={(value) => handleInputChange("startDate", value)}
                    value={formData3.startDate}
                />
                <TextInput
                    style={{ borderWidth: 1, borderColor: "#000", height: 30 }}
                    placeholder="Discount"
                    onChangeText={(value) => handleInputChange("Discount", value)}
                    value={formData3.Discount}
                />
                <Button title="Submit" onPress={handleSubmit} />
           
           
       
            </View>

        </View>
    )
}
export default MembershipPage;