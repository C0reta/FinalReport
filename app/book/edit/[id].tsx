import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../app/style'; // 스타일 경로 확인!
import { BookForm } from '../../../components/BookForm'; // 경로 확인!
import { Book } from '../../../utils/bookUtils';

export default function EditBook() {
    const router = useRouter();

    // get id from url
    const { id } = useLocalSearchParams();

    // data(unedited)
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('my-books');
                const books: Book[] = jsonValue != null ? JSON.parse(jsonValue) : [];
                // ID가 일치하는 책 찾기
                const foundBook = books.find(b => b.id === Number(id));

                if (foundBook) {
                    setBook(foundBook);
                } else {
                    Alert.alert("오류", "책 정보를 찾을 수 없습니다.");
                    router.back();
                }
            } catch (e) {
                console.error("불러오기 실패", e);
            }
        };
        loadBook();
    }, [id]);

    // 4. saved: push x 교체
    const handleUpdateBook = async (updatedBook: Book) => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-books');
            const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];

            // id 같으면 바꿔치기
            const newBooks = books.map(b =>
                // id 유지
                b.id === Number(id) ? { ...updatedBook, id: Number(id) } : b
            );

            await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));

            // 수정 후=> 상세페이지
            router.back();
        } catch (e) {
            console.error("수정 실패", e);
        }
    };

    // 로딩 빈화면
    if (!book) return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>책 수정하기</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* initialData 기존책정보 */}
            <BookForm
                initialData={book}
                onSubmit={handleUpdateBook}
                submitButtonLabel="수정 완료"
            />

        </SafeAreaView>
    );
}