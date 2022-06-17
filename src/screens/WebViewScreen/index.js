/* eslint-disable react/react-in-jsx-scope */
import { useRef } from 'react';
import {
    Animated, SafeAreaView, ScrollView, Text, View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DATA from '../../../data';
import AnimatedHeader from '../../components/AnimatedHeader';

export default function WebViewScreen() {
    const offset = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
                <AnimatedHeader animatedValue={offset} />
                <ScrollView
                    style={{ flex: 1, backgroundColor: 'white' }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: 220,
                        paddingHorizontal: 20
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: offset } } }],
                        { useNativeDriver: false }
                    )}
                >
                    {DATA.map((item) => (
                        <View
                            key={item.id}
                            style={{
                                marginBottom: 20
                            }}
                        >
                            <Text style={{ color: '#101010', fontSize: 32 }}>
                                {item.title}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
