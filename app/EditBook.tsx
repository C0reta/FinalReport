import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookForm } from '../components/BookForm'; // 👈 공통 폼 가져오기
import { Book } from '../utils/bookUtils';
import { styles } from './style';

export default function EditBook() {
    const router = useRouter();

    // 저장 로직 (onSubmit으로 전달될 함수)
    const handleAddBook = async (newBook: Book) => {
        try {
            const existingBookJson = await AsyncStorage.getItem('my-books');
            const books = existingBookJson ? JSON.parse(existingBookJson) : [];
            books.push(newBook);
            await AsyncStorage.setItem('my-books', JSON.stringify(books));
            router.back();
        } catch (e) {
            console.error("저장 실패", e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>책 저장</Text>
                <View style={{ width: 24 }} /> {/* 레이아웃 균형용 빈 박스 */}
            </View>

            {/* 👇 폼 렌더링 (초기값 없음 = 추가 모드) */}
            <BookForm onSubmit={handleAddBook} submitButtonLabel="수정하기" />
            
        </SafeAreaView>
    );
}