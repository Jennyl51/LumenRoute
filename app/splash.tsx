import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withSequence,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Fade-in logo over 2 seconds
    opacity.value = withTiming(1, {
      duration: 2000,
      easing: Easing.out(Easing.quad),
    });

    // Star sparkle animation:
    // rotate right → left → center
    rotate.value = withSequence(
      withTiming(20, { duration: 1300, easing: Easing.ease }),
      withTiming(-20, { duration: 1300, easing: Easing.ease }),
      withTiming(0, { duration: 900, easing: Easing.ease })
    );

    scale.value = withSequence(
        withTiming(2.5, { duration: 1300, easing: Easing.out(Easing.quad) }), // bigger on right
        withTiming(1, { duration: 1300, easing: Easing.in(Easing.quad) })     // back to normal
      );

    // After animation → navigate to map
    setTimeout(() => {
        router.replace('/(tabs)/map');
    }, 3500);
  }, []);

  // Fade style
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Star rotation style
  const starStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotate.value}deg`,
        
      },{ scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Wrap image + animated star */}
      <Animated.View style={[fadeStyle]}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('@/assets/images/lr-logo-neon.png')}
            style={styles.logo}
          />

          {/* Animated star positioned exactly on the logo's star area */}
          <Animated.Image
            source={require('@/assets/images/star.png')}
            style={[styles.star, starStyle]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030b1a', // dark gradient-like background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    position: 'relative',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  star: {
    position: 'absolute',
    top: 35,   // Adjust so it matches your LR star location
    left: 60, // Adjust so it matches your LR star location
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
