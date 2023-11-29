import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './Pages/HomePage';
import MemberPage from './Pages/MemberloginPage/MemberPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginNavigation from './Pages/MemberloginPage/loginNavigation';
import store from './src/Store/Store';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Tab.Navigator
    screenOptions={({ route }) => ({
      activeTintColor: '#17e346',
      inactiveTintColor: 'gray',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Members') {
          iconName = focused ? 'people' : 'people-outline';
        }

        // You can return any component here for the tab icon
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    // tabBarOptions={{
    //   activeTintColor: '#17e346',
    //   inactiveTintColor: 'gray',
    // }}
    >
    <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }}  />
    <Tab.Screen name="Members" component={LoginNavigation} options={{ headerShown: false }}  />
  </Tab.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
