import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ThemeContext} from '../../stores/themeContext';

const useStyles = () => {
    const {isDarkModeOn} = useContext(ThemeContext);

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
        },
        title: {
            fontSize: 40,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 20,
            color: isDarkModeOn ? 'white' : 'black',
        },
        step: {
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            color: isDarkModeOn ? 'white' : 'black',
        },
        note: {
            fontSize: 15,
            fontStyle: 'italic',
            marginTop: 120,
            flex: 1,
            paddingHorizontal: 20,
            textAlign: 'center',
            color: isDarkModeOn ? 'white' : 'black',
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 200,
        },
        buttonText: {
            color: 'black',
            fontSize: 16,
        },
        buttonClicked: {
            backgroundColor: 'blue',
        },
    });
};

export default useStyles;
