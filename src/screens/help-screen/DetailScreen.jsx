import * as React from "react";
import {View, Text, StyleSheet} from "react-native";
import {List, Divider, useTheme} from "react-native-paper";
import {ThemeContext} from "../../stores/themeContext";
import useStyles from "./pageStyle";

export default function HelperScreenDetail({navigation}) {
    const {colors} = useTheme();
    const {isDarkModeOn} = React.useContext(ThemeContext)
    const styles = useStyles()
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>

            <Text style={[styles.title, {color: isDarkModeOn ? 'white' : 'black'}]}>帮助</Text>

            <Divider/>
            <List.Section>
                <List.Item
                    title="如何添加行程？"
                    left={(props) => <List.Icon {...props} icon="help-circle"/>}
                    onPress={() => navigation.navigate("addScreen")}
                />
            </List.Section>
            <Divider/>

            <List.Section>
                <List.Item
                    title="如何顶置行程？"
                    left={(props) => <List.Icon {...props} icon="help-circle"/>}
                    onPress={() => navigation.navigate("upScreen")}
                />
            </List.Section>
            <Divider/>

            <List.Section>
                <List.Item
                    title="如何为行程设置提醒时间？"
                    left={(props) => <List.Icon {...props} icon="help-circle"/>}
                    onPress={() => navigation.navigate("timeScreen")}
                />
            </List.Section>
            <Divider/>

            <List.Section>
                <List.Item
                    title="如何一键删除行程"
                    left={(props) => <List.Icon {...props} icon="help-circle"/>}
                    onPress={() => navigation.navigate("deleteScreen")}
                />
            </List.Section>
            <Divider/>
        </View>
    )
}


