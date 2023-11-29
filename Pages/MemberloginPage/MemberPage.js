import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import FlashMessage,{ showMessage } from "react-native-flash-message";

import LoginNavigation from "./loginNavigation";
import BasicPage from "./Basic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Text,
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet, ScrollView,
    Dimensions,
    Image
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MemberPage = (props) => {
    const [text, setText] = useState('')
    const [userList, setUserList] = useState([])
    const [iconName, setIconName] = useState('notifications-circle-outline');
  

    const isFocused = useIsFocused()
    const handleAddNewItem = () => {
        props.navigation.navigate('Member Registration');
    };
    const _clearAll = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Done');
        } catch (error) {
            console.log(error);
        }
    };


    const fetchUserData = async () => {
        try {
            const storedUserList = await AsyncStorage.getItem("userData");
            const parsedUserList = storedUserList ? JSON.parse(storedUserList) : [];

            console.log("------------start user list--------")
            console.log(storedUserList)
            console.log("------------start user list--------")
            const usersWithIconNames = parsedUserList.map(user => ({
                ...user,
                iconName: 'notifications-outline'
            }));
             
            setUserList(usersWithIconNames)
          
            
            if (text.trim() !== '') {
                const filteredUsers = userList.filter(user =>
                    user.basicData.name.toLowerCase().includes(text.toLowerCase())
                );
                setUserList(filteredUsers);
            } else {
                setUserList(usersWithIconNames);
            }
      

            console.log('---------------------------userlist starts------------------')
            console.log(userList)
            console.log('---------------------------userlist End------------------')

        } catch (error) {
            // Handle AsyncStorage errors
            console.error("Error fetching data from AsyncStorage:", error);
        }
    };

    useEffect(() => {

        fetchUserData();
        //_clearAll()



    }, [isFocused,text]);
    const showNotificationSentMessage = () => {
        showMessage({
            message: "Notification Sent",
            type: "success",
        });
    };
    const handleNotificationPress = (index) => {
        // Toggle the 'iconName' property for the specific user
        setUserList(prevUserList => {
            const updatedUserList = [...prevUserList];
            if (updatedUserList[index].iconName === 'notifications-outline') {
                // Show notification sent message when bell icon is clicked
                showNotificationSentMessage();
            }
            updatedUserList[index].iconName = updatedUserList[index].iconName === 'notifications-outline' ? 'notifications-off-outline' : 'notifications-outline';
           
            return updatedUserList;
        });
    };
    const renderItem = ({ item, index }) => (
        <View style={styles.box}>

        
        <View style={styles.box1}>
            <Image
                source={{ uri: item.basicData.profileImage }}
                style={{ width: windowWidth * .2, height: windowHeight * .1, borderRadius: 50, marginBottom: 20 }}
            />
            <View style={{ paddingLeft: 10 }}>
                <Text>Name: {item.basicData.name}</Text>
                <Text>Place: {item.basicData.Address}</Text>
                <Text>Membership: {item.membershipData.Plan}</Text>
            </View>
            <TouchableOpacity onPress={() => handleNotificationPress(index)}>
                <Icon name={item.iconName} size={40} color={item.iconName === 'notifications-off-outline' ? 'red' : '#17e346'} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleViewMorePress(item)}>
            <Text>View More</Text>
        </TouchableOpacity>
        </View>
    );
    const handleViewMorePress = (selectedUser) => {
        props.navigation.navigate('userDetails', { user: selectedUser });
    };


    return (
        <View style={styles.PageView}>
            <View style={{ flexDirection: "row",backgroundColor:"#ff9"  }}>
                <View style={{ flexDirection: "row", borderColor: "#000", borderWidth: 1, width: windowWidth*.8 }}>
                    <TextInput

                        placeholder="Enter text"
                        value={text}
                        onChangeText={(inputText) => setText(inputText)}
                        style={{ width: 250 ,borderRadius:15}}

                    />

                    <View>
                        <TouchableOpacity onPress={fetchUserData}>
                            <Icon name="search" size={25} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    <TouchableOpacity onPress={handleAddNewItem}>
                        <Icon name="add-circle-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{}}>
            <FlatList
                data={userList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            </View>
          
            {/* <ScrollView>

                {userList?.map((item, index) => (
                    <View key={index} style={styles.box}>
                        <View>
                            <Image
                                source={{ uri: item.basicData.profileImage }}
                                style={{ width: windowWidth * .2, height: windowHeight * .1, borderRadius: 50, marginBottom: 20 }}
                            />
                        </View>
                        <View style={{ paddingLeft: 10 }}>

                            <Text>Name: {item.basicData.name}</Text>
                            <Text>Place:{item.basicData.Address}</Text>
                            <Text>Membership :{item.membershipData.Plan}</Text>
                        </View>
                        <View >
                        <TouchableOpacity onPress={() => handleNotificationPress(index)} >
                            <Icon name={item.iconName} size={40}
                             color={item.iconName === 'notifications-off-outline' ? 'red' : '#17e346'} />
                        </TouchableOpacity>
                        </View>

                    </View>
                ))}


            </ScrollView> */}
             <FlashMessage position="bottom " />
        </View>
    )
}
export default MemberPage;
const styles = StyleSheet.create({
    box1: {
      
        flexDirection: "row",
        padding: 10,
        marginTop: 5,
       
        justifyContent:"space-between"



    },
    box:{
        borderWidth: 1,
        borderColor: "#00f",
        borderRadius: 15,
        height: windowHeight * .2,
        backgroundColor: "#fff",

    },
    PageView: { 
        paddingTop: 40, 
        padding: 10,
         height: "100%", 
         backgroundColor:"#552a61",
         
         marginTop:10
         

        }
})






