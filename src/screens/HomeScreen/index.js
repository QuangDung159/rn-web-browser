/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet, TextInput, View
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
                    const isTriggerToggle = Math.abs(contentOffset.y - currentScroll) > 20;

                    if (contentOffset.y <= currentScroll || contentOffset.y <= 0) {
                        if (isTriggerToggle) {
                            setIsScrollUp(true);
                        }
                    } else if (isTriggerToggle) {
                        setIsScrollUp(false);
                    }
                    setCurrentScroll(contentOffset.y);
                }}
            />
        ), [uri, currentScroll]
    );

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            {isScrollUp && (
                <View
                    style={{
                        SHADOW: {
                            shadowColor: '#000000',
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowRadius: 5,
                            shadowOpacity: 0.7,
                            elevation: 10,
                        },
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
                        onSubmitEditing={() => fetchWebsite()}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onFocus={() => onFocusInput()}
                        onBlur={() => fetchWebsite()}
                    />
                </View>
            )}

            {renderWebView()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingHorizontal: 10,
    },
});
