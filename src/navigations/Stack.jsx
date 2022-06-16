import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import PersonalScreen from '../screens/PersonalScreen';
import SettingDetailScreen from '../screens/SettingDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { SCREEN_NAME, SCREEN_TITLE, THEME } from '../utils/Constants';

const { FONTS, SIZES } = THEME;

const headerConfig = {
    headerStyle: {
        // backgroundColor: 'transparent',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: FONTS.TEXT_BOLD,
        fontSize: SIZES.FONT_H2,
        elevation: 0,
    },
};

const HomeStackNavigator = createNativeStackNavigator();
const SettingsStackNavigator = createNativeStackNavigator();

export const HomeStack = () => (
    (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen
                options={{
                    ...headerConfig,
                    title: SCREEN_TITLE.HOME,
                }}
                name={SCREEN_NAME.HOME}
                component={HomeScreen}
            />
            <HomeStackNavigator.Screen
                options={{
                    ...headerConfig,
                    title: SCREEN_TITLE.PERSONAL,
                }}
                name={SCREEN_NAME.PERSONAL}
                component={PersonalScreen}
            />
        </HomeStackNavigator.Navigator>
    )
);

export const SettingsStack = () => (
    <SettingsStackNavigator.Navigator>
        <SettingsStackNavigator.Screen
            options={{
                ...headerConfig,
                title: SCREEN_TITLE.SETTINGS,
            }}
            name={SCREEN_NAME.SETTINGS}
            component={SettingsScreen}
        />
        <SettingsStackNavigator.Screen
            options={{
                ...headerConfig,
                title: SCREEN_TITLE.SETTING_DETAIL,
            }}
            name={SCREEN_NAME.SETTING_DETAIL}
            component={SettingDetailScreen}
        />
    </SettingsStackNavigator.Navigator>
);
