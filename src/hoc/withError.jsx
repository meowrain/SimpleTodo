import React from "react";
import {Text} from "react-native-paper";
/*
* 错误页面
* */
const withError = (WrappedComponent, error_message) => {
    const WrappedErrorComponent = (props) => {
        return (
            <ErrorComponent errors={error_message}>
                <WrappedComponent
                    {...props}
                />
            </ErrorComponent>
        )
    }
    return WrappedErrorComponent
}
const ErrorComponent = ({children,errors})=>{
    return (
        <>
            {children}
            <Text>{errors}</Text>
        </>
    )
}