import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const PulseEffect = ({width=100,height=100,color,borderRadius=10}:any) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.View style={[{width: width, height: height,backgroundColor: color,borderRadius: borderRadius}, { transform: [{ scale: scaleValue }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PulseEffect;
