import { StyleSheet, Dimensions } from 'react-native';

const {height: screenHeight} = Dimensions.get('window')

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1
    },

    bottomsheet_container: {
        width: '100%',
        height: screenHeight,
        backgroundColor: "white",
        position: 'absolute',
        top: screenHeight / 1.5,
        zIndex: 12000,
        borderRadius: 15,
        paddingHorizontal: 10,
        
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: 'darkgray',
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10
    }
})

export default styles;