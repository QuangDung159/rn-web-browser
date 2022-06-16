import React from 'react';
import { Button, Text, View } from 'react-native';
import { SCREEN_NAME, STACK_NAME } from '../../utils/Constants';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home screen!</Text>
            <Button
                onPress={() => {
                    navigation.navigate(SCREEN_NAME.PERSONAL);
                }}
                title="Go to personal"
            />
            <Button
                onPress={() => {
                    navigation.navigate(STACK_NAME.SETTINGS_STACK, { screen: SCREEN_NAME.SETTING_DETAIL });
                }}
                title="Go to setting detail"
            />
        </View>
    );
}
