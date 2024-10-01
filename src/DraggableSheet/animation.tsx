import { useSharedValue, useAnimatedStyle, withSpring, interpolate } from 'react-native-reanimated'

export const useSheetAnimation = (screenHeight: any, Gesture: any) => {

    const translateMaxY = screenHeight / 1.75

    const snapPoints = [ -translateMaxY, 200]

    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})

    const gesture = Gesture.Pan()

    .onStart(() => {
        context.value = { y: translateY.value }
    })
    .onUpdate((e: any) => {
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

    return {gesture, reanimatedBottomStyle, animatedOverlayStyle}
}   