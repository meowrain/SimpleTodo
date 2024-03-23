import {StatusBar} from "expo-status-bar";
import {StyleSheet} from "react-native";
import {Button, PaperProvider} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import TodoNavigationContainer from "./src/navigation";
import {ThemeProvider, ThemeContext} from "./src/stores/themeContext";
import {useContext, useEffect, useState} from "react";

export default function App() {
    return (
        <ThemeProvider>
            <RootApplication/>
        </ThemeProvider>
    );
}

function RootApplication() {
    const {paperTheme} = useContext(ThemeContext)
    return (
        <PaperProvider theme={paperTheme}>
            <SafeAreaView
                style={[styles.container, {backgroundColor: paperTheme.colors.background}]}
            >
                <StatusBar style="auto"/>
                <TodoNavigationContainer/>
            </SafeAreaView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
