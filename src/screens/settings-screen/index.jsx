import React from "react";
import {View} from "react-native";
import {List, Switch, Divider} from "react-native-paper";
import {ThemeContext} from "../../stores/themeContext";
import {Octicons} from '@expo/vector-icons';

export default function SettingsScreen({navigation}) {
    const {isDarkModeOn, toggleTheme} = React.useContext(ThemeContext)

    return (
        <View>
            <View
                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}><Octicons
                name="gear" size={22} color={isDarkModeOn ? 'white' : 'black'}/><List.Section title="设置"
                                                                                              titleStyle={{fontSize: 18}}></List.Section></View>
            <List.Section>
                <List.Subheader>主题</List.Subheader>
                <List.Item
                    title="暗黑模式"
                    left={(props) => <List.Icon {...props} icon="weather-night"/>}
                    right={() => (
                        <Switch value={isDarkModeOn} onValueChange={toggleTheme}/>
                    )}
                />
            </List.Section>


            <Divider/>
            <List.Section>
                <List.Subheader>工具</List.Subheader>
                <List.Item
                    title="备份与恢复"
                    left={(props) => <Octicons {...props} name="gear" size={20} color="black"/>}
                ></List.Item>
            </List.Section>
            <Divider/>
            <List.Section>
                <List.Subheader>反馈</List.Subheader>
                <List.Item
                    title="反馈问题"
                    left={(props) => <List.Icon {...props} icon="help-circle"/>}
                    onPress={() => navigation.navigate("feedBackScreen")}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>关于</List.Subheader>
                <List.Item
                    title="帮助"
                    left={(props) => <List.Icon {...props} icon="help-circle"/>}
                    onPress={() => navigation.navigate("HelpScreen")}
                />
            </List.Section>

        </View>
    );
}
