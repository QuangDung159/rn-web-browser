import React from 'react';
import { View, Text, Button } from 'react-native';
import { SCREEN_NAME } from '../../utils/Constants';

export default function PersonalScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Personal Screen!</Text>
            <Button
                onPress={() => {
                    navigation.navigate(SCREEN_NAME.HOME);
                }}
                title="Go to home"
            />
        </View>
    );
}
