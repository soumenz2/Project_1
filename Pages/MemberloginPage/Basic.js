import React,{useState,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import {  setBasicData } from "../../src/Reducer/BascicSlice";

import {
    Text,
    View,
    Button,
    TextInput,Image,
    TouchableOpacity,
    StyleSheet,Modal
} from 'react-native';
import RadioButtonComponent from '../../src/Component/Component';
const defaultProfileImage = require("../../assets/default_image.jpg");



const BasicPage=({navigation})=>{
    const [formData1, setFormData] = useState({
        name: '',
        mobileNumber:'',
        Email:'',
        Gender:'',
        Address:'',
        Emobilenumber:'',
        dob:'',
        id_proof:'',
        profileImage: null,
      });
      const dispatch = useDispatch();
      //const finalData = useSelector((state) => state.basicData); 

      const [showOptions, setShowOptions] = useState(false);

      const [isModalVisible, setModalVisible] = useState(false);

      useEffect(() => {
        (async () => {
          // Request camera and gallery permissions
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        })();
      }, []);
      const pickImage = async (fromCamera) => {
        let result;
    
        if (fromCamera) {
          result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
        } else {
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
        }
    
        if (result.canceled===false) {
          console.log(result)
          console.log(result.assets[0].uri)
          setFormData({ ...formData1, profileImage: result.assets[0].uri })
          setShowOptions(!showOptions)
         
        }
   
      };
    
      const options = [
        { label: "Male ", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Others", value: "Others" },
      ];
      const handleInputChange=(feildNmae,value)=>{
        setFormData({...formData1,[feildNmae]:value})
         
      }
      const handleSubmit=()=>{
    
        console.log(formData1)
        
      }
    
      const onNextAction= async()=>{

        dispatch(setBasicData(formData1))
        navigation.navigate('Body Stats')
      }

    return(
      <View style={{ width: "100%", height: "10" ,flex:1}}>
        
        <TouchableOpacity 
        style={styles.profileContainer}
        onPress={() => setShowOptions(!showOptions)}
        >
          <Image
        source={formData1.profileImage ? { uri: formData1.profileImage } : defaultProfileImage}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
      />
      </TouchableOpacity> 
       {showOptions && (
    <View style={styles.optionsContainer}>
        <Button title="Select from Camera" onPress={() => pickImage(true)} />
        <Button title="Select from Gallery" onPress={() => pickImage(false)} />
      
      </View>
      )}

{/* <TouchableOpacity
                style={styles.profileContainer}
                onPress={() => setModalVisible(true)}
            >
                <Image
                    source={formData1.profileImage ? { uri: formData1.profileImage } : defaultProfileImage}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.option} onPress={() => pickImage(true)}>
                       
                        <Button title="Select from Camera" onPress={() => pickImage(true)} />
        <Button title="Select from Gallery" onPress={() => pickImage(false)} />
                    </TouchableOpacity>
             
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
             */}

      
        <TextInput
          style={{ borderWidth: 1, borderColor: "#000", height: 30 }}

          placeholder="Name"
          onChangeText={(value) => handleInputChange("name", value)}
          value={formData1.name}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: "#000", height: 30 }}
          placeholder="Mobile Number"
          onChangeText={(value) => handleInputChange("mobileNumber", value)}
          value={formData1.mobileNumber}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: "#000", height: 30 }}
          name="Email"
          placeholder="Email"
          onChangeText={(value) => handleInputChange("Email", value)}
          value={formData1.Email}
        />
        <View>
          <RadioButtonComponent
            options={options}
            onValueChange={(value) => handleInputChange("Gender", value)}
            value={formData1.Gender}
          />
        </View>
        <TextInput
          style={{ borderWidth: 1, borderColor: "#000", height: 30 }}
          placeholder="Adress"
          onChangeText={(value) => handleInputChange("Address", value)}
          value={formData1.Address}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: "#000", height: 30 }}
          placeholder="Emergency Contact Number"
          onChangeText={(value) => handleInputChange("Emobilenumber", value)}
          value={formData1.Emobilenumber}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: "#000", height: 30 }}
          placeholder="Date of Birth"
          onChangeText={(value) => handleInputChange("dob", value)}
          value={formData1.dob}
        />
        <Button title="Submit" onPress={handleSubmit} />

        <View>
          <Button title="Next" onPress={onNextAction} />
        </View>
      </View>
    )
}
export default BasicPage;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
  },
  profileContainer: {
      position: "relative",
      alignItems:"center"
  },
  profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
  },
  optionsContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 10,
  },
  optionIcon: {
      width: 50,
      height: 50,
      marginHorizontal: 10,
  },
});