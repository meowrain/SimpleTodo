import React, {useEffect, useState, useContext} from "react";
import {Image} from "react-native";
import {Banner} from "react-native-paper";
import {AntDesign} from '@expo/vector-icons';

export default function HelpScreen() {
    const [visible, setVisible] = useState(true);
    return (
        <Banner
            visible={visible}
            actions={[
                {
                    label: "忽略",
                    onPress: () => setVisible(false),
                },
                {
                    label: "了解更多",
                    onPress: () => setVisible(false),
                },
            ]}
            icon={({size}) => (
                <AntDesign name="questioncircleo" size={size} color="black"/>
            )}
        >了解此应用</Banner>
    );
}
