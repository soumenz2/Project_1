import React from "react";


import {
    Text,
    View
} from 'react-native';
import BasicPage from "./Basic";
import BodyStatsPage from "./BodyStats";
import MembershipPage from "./Membership";
import MemberPage from "./MemberPage";
import LoginFormPage from "./loginFormPage";
import UserDetails from "./userDetailsPage";


import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const LoginNavigation=()=>{
   

    return(
        <Stack.Navigator>
       <Stack.Screen name="MembersPage" component={MemberPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Member Registration" component={LoginFormPage} />
        <Stack.Screen name="userDetails" component={UserDetails} />
        

        {/* Add other stack screens here if needed */}
      </Stack.Navigator>
    )
}
export default LoginNavigation;