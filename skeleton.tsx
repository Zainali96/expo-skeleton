import React, { useEffect, useRef } from 'react';
import {
  Animated,
  DimensionValue,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface SkeletonProps {
  borderRadius?: number;
  height:number;
  width?: DimensionValue;

}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius = 4 }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);


  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.12],
  });

  return (
    <View style={[styles.container, { width, height,borderRadius }]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.overlay,
          { borderRadius, opacity },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(22, 21, 18)',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});

export default Skeleton;
