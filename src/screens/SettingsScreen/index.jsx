import React from 'react';
import { Button, Text, View } from 'react-native';
import { SCREEN_NAME, STACK_NAME } from '../../utils/Constants';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen!</Text>
            <Button
                onPress={() => {
                    navigation.navigate(SCREEN_NAME.SETTING_DETAIL);
                }}
                title="Go to setting detail"
            />
            <Button
                onPress={() => {
                    navigation.navigate(STACK_NAME.HOME_STACK, { screen: SCREEN_NAME.PERSONAL });
                }}
                title="Go to personal"
            />
        </View>
    );
}
