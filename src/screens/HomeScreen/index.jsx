/* eslint-disable react/react-in-jsx-scope */
import Constants from 'expo-constants';
import { useCallback, useState } from 'react';
import {
    StyleSheet, TextInput,
    View
} from 'react-native';
import WebView from 'react-native-webview';

export default function HomeScreen() {
    const [url, setUrl] = useState('https://google.com');
    const [uri, setUri] = useState(url);
    const [urlDisplay, setUrlDisplay] = useState('https://google.com');
    const [currentScroll, setCurrentScroll] = useState(0);
    const [isScrollUp, setIsScrollUp] = useState(true);

    const fetchWebsite = () => {
        const validUrl = `https://${url}`;
        setUri(validUrl);
        setUrlDisplay(validUrl);
    };

    const onFocusInput = () => {
        let formattedUrl = urlDisplay;
        formattedUrl = formattedUrl?.replace('https://', '');
        formattedUrl = formattedUrl?.replace('http://', '');
        setUrlDisplay(formattedUrl);
    };

    const renderWebView = useCallback(
        () => (
            <WebView
                source={{ uri }}
                pullToRefreshEnabled
                onScroll={(syntheticEvent) => {
                    const { contentOffset } = syntheticEvent.nativeEvent;
                    if (contentOffset.y <= currentScroll || contentOffset.y <= 0) {
                        setIsScrollUp(true);
                    } else {
                        setIsScrollUp(false);
                    }
                    setCurrentScroll(contentOffset.y);
                }}
            />
        ), [uri, currentScroll]
    );

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {isScrollUp && (
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
                    onFocus={() => onFocusInput()}
                />
            )}

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
