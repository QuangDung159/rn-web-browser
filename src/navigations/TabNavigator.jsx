import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { STACK_NAME } from '../utils/Constants';
import { HomeStack, SettingsStack } from './Stack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name={STACK_NAME.HOME_STACK}
                component={HomeStack}
            />
            <Tab.Screen
                name={STACK_NAME.SETTINGS_STACK}
                component={SettingsStack}
            />
        </Tab.Navigator>
    );
}
