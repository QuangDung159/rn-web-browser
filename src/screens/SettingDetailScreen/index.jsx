import React from 'react';
import { Button, Text, View } from 'react-native';
import { SCREEN_NAME } from '../../utils/Constants';

export default function SettingDetailScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Setting Detail Screen!</Text>
            <Button
                onPress={() => {
                    navigation.navigate(SCREEN_NAME.SETTINGS);
                }}
                title="Go to settings"
            />
        </View>
    );
}
