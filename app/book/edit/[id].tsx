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
    
    // 1. [차이점] URL에서 수정할 책의 ID를 받아와야 해!
    const { id } = useLocalSearchParams(); 
    
    // 2. [차이점] 기존 데이터를 담을 상태가 필요해
    const [book, setBook] = useState<Book | null>(null);

    // 3. [차이점] 들어오자마자 기존 책 정보를 불러와서 state에 넣기
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

    // 4. [차이점] 저장 로직: 추가(Push)가 아니라 교체(Map)해야 함!
    const handleUpdateBook = async (updatedBook: Book) => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-books');
            const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];

            // 배열을 돌면서 ID가 같은 녀석만 새 정보로 바꿔치기!
            const newBooks = books.map(b => 
                // ID는 URL에서 가져온 원래 ID를 유지해야 함 (중요!)
                b.id === Number(id) ? { ...updatedBook, id: Number(id) } : b
            );

            await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));
            
            // 수정 후엔 상세 페이지로 돌아가기
            router.back(); 
        } catch (e) {
            console.error("수정 실패", e);
        }
    };

    // 데이터 로딩 중이면 빈 화면 보여주기 (안 그러면 에러 남)
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

            {/* 👇 [핵심] initialData에 기존 책 정보를 넣어줘야 폼이 채워진 채로 뜸! */}
            <BookForm 
                initialData={book} 
                onSubmit={handleUpdateBook} 
                submitButtonLabel="수정 완료" 
            />
            
        </SafeAreaView>
    );
}