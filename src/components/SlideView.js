/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import {
    Animated
} from 'react-native';

export default function SlideView({ children }) {
    const animated = new Animated.Value(0);
    const duration = 5000;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(animated, {
                toValue: 255,
                duration,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
            {children}
        </Animated.View>
    );
}
