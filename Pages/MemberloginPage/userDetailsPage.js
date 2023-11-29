import React from 'react';
import { View,
     Text,
     Image ,
     Dimensions,
     StyleSheet
    } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserDetails = ({ route }) => {
    const { user } = route.params;

    return (
        <View style={styles.Box}>
             <Image
                source={{ uri: user.basicData.profileImage }}
                style={{ width: windowWidth * .2, height: windowHeight * .1, borderRadius: 50, marginBottom: 20 }}
            />
            <Text>Name: {user.basicData.name}</Text>
            <Text>Place: {user.basicData.Address}</Text>
            <Text>Mobile Nunmer :{user.basicData.mobileNumber}</Text>
            <Text>Date of Birth :{user.basicData.dob}</Text>
            <Text>Height :{user.bodyStatsData.Height}</Text>
            <Text>Width :{user.bodyStatsData.Weight}</Text>
            <Text>Membership: {user.membershipData.Plan}</Text>
            <Text>Discount: {user.membershipData.Discount}</Text>

            {/* Display other user data as needed */}
        </View>
    );
};

export default UserDetails;
const styles=StyleSheet.create({
  Box:{
    borderWidth: 1,
    borderColor: "#00f",
    borderRadius: 15,
    height: windowHeight * .5,
    backgroundColor: "#ff4",
    alignItems:'center',
    padding:5


  }
})
