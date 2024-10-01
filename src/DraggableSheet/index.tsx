import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useSheetAnimation } from './animation'
import Animated from 'react-native-reanimated'
import createStyles from './styles'

const {height: screenHeight} = Dimensions.get('window')

interface BottomSheetProps {
    children: React.ReactNode
}

const BottomSheet: React.FC<BottomSheetProps> = ({
    children,
}) => {

    const {gesture, reanimatedBottomStyle, animatedOverlayStyle} = useSheetAnimation(screenHeight, Gesture)
    const styles = createStyles(screenHeight)

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


export default BottomSheet