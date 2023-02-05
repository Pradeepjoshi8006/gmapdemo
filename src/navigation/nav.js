/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ResturantList from '../screens/ResturantList';
import ResturantMap from '../screens/ResturantMap';
import Login from '../screens/Login';
import {TEXTCONST} from '../utils/Constant';
import {Icons} from '../utils/ImageConst';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();

const ProtectedRoutes = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name={TEXTCONST.Resturant}
        component={ResturantList}
        options={{
          title: TEXTCONST.Resturant,
          tabBarIcon: ({size}) => {
            return (
              <Image style={{width: size, height: size}} source={Icons.plate} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={TEXTCONST.Map}
        component={ResturantMap}
        options={{
          title: TEXTCONST.Map,
          tabBarIcon: ({size}) => {
            return (
              <Image
                style={{width: size, height: size}}
                source={Icons.shopPin}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const RootApp = ({isLoggedIn}) => {
  const CreateRootNavigator = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name={TEXTCONST.Home}
              component={ProtectedRoutes}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen name={TEXTCONST.Login} component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  return <CreateRootNavigator />;
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.resturant.isLoggedIn,
  };
};

export default connect(mapStateToProps)(RootApp);
