/* eslint-disable react/react-in-jsx-scope */
import Constants from 'expo-constants';
import { useCallback, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import WebView from 'react-native-webview';

export default function HomeScreen() {
    const [url, setUrl] = useState('google.com');
    const [uri, setUri] = useState(url);
    const [urlDisplay, setUrlDisplay] = useState();

    const fetchWebsite = () => {
        const validUrl = `https://${url}`;
        setUri(validUrl);
        setUrlDisplay(validUrl);
    };

    const renderWebView = useCallback(
        () => (
            <WebView
                style={styles.container}
                source={{ uri }}
            />
        ), [uri]
    );

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <TextInput
                style={styles.input}
                onChangeText={(input) => {
                    setUrl(input);
                    setUrlDisplay(input);
                }}
                value={urlDisplay}
                placeholder="Enter URL"
                onSubmitEditing={() => {
                    fetchWebsite();
                }}
                autoCorrect={false}
                autoCapitalize="none"
                onFocus={() => {
                    let formattedUrl = urlDisplay;
                    formattedUrl = formattedUrl?.replace('https://', '');
                    formattedUrl = formattedUrl?.replace('http://', '');
                    setUrlDisplay(formattedUrl);
                }}
            />
            {renderWebView()}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
        marginTop: Constants.statusBarHeight
    },
});
