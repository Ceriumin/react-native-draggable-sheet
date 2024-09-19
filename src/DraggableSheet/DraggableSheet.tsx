import { Dimensions, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate } from 'react-native-reanimated'
import styles from './styles'

const {height: screenHeight} = Dimensions.get('window')
const translateMaxY = screenHeight / 1.75

const snapPoints = [ -translateMaxY, 200]

interface SheetProps {
    children: React.ReactNode
}

const DraggableSheet: React.FC<SheetProps> = ({
    children,
}) => {
    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})

    const gesture = Gesture.Pan()

    .onStart(() => {
        context.value = { y: translateY.value }
    })
    .onUpdate((e) => {
        translateY.value = e.translationY + context.value.y
        translateY.value = Math.max(translateY.value, -translateMaxY)
    })
    .onEnd(() => {
        const endValue = translateY.value
        const closestSnapPoint = snapPoints.reduce((prev, curr) =>
            Math.abs(curr - endValue) < Math.abs(prev - endValue) ? curr : prev
        )
        translateY.value = withSpring(closestSnapPoint, { damping: 75 })
    })

    console.log(translateY.value);

    const reanimatedBottomStyle = useAnimatedStyle(() => {
        return {
            transform: [ {translateY: translateY.value} ]
        }
    })

    const animatedOverlayStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [-translateMaxY, 0],
            [1, 0],
            'clamp' 
        );
    
        return {
            opacity,
        };
    });
          
  return (
    <>
        <GestureDetector gesture={gesture}>
            <View>
                <Animated.View style={[styles.overlay, animatedOverlayStyle]} />
                <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
                    <View style={styles.line} />
                    {children}
                </Animated.View>
            </View>
        </GestureDetector>
    </>
  )
}

export default DraggableSheet