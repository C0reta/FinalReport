import { useRouter } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';


export default function AddBook() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text>책 추가 페이지</Text>
        </SafeAreaView>
    )
}

// 끝!