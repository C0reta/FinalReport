import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import { styles } from '../app/style';


interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
}

export const InputField = ({ label, value, onChangeText, placeholder, keyboardType }: InputFieldProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, { paddingBottom: 5 }]}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder || ""}
                keyboardType={keyboardType} // 키패드
            />
        </View>
    );
};