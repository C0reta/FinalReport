import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookForm } from '../../components/BookForm';
import { Book } from '../../utils/bookUtils';
import { styles } from '../style';

export default function AddBook() {
    const router = useRouter();

    // 저장
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
                <View style={{ width: 24 }} /> {/* 레이아웃용 */}
            </View>

            <BookForm onSubmit={handleAddBook} submitButtonLabel="저장하기" />
            
        </SafeAreaView>
    );
}