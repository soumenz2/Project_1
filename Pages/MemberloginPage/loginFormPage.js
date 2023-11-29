import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BasicPage from "./Basic";
import MembershipPage from "./Membership";
import Bodystats from "./BodyStats";


const Tab = createMaterialTopTabNavigator();



const LoginFormPage=()=>{
    return(
      
        <Tab.Navigator>
        <Tab.Screen name="Basic" component={BasicPage} />
        <Tab.Screen name="Body Stats" component={Bodystats} />
        <Tab.Screen name="Membership Stats" component={MembershipPage} />
      </Tab.Navigator>
      
       

    )
}
export default LoginFormPage