// hooks/useBookDetail.ts
import { Book } from '@/utils/bookUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export const useBookDetail = (id: string | string[] | undefined) => {
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. 책 불러오기
    useFocusEffect(
        useCallback(() => {
            const loadBook = async () => {
                if (!id) return;
                try {
                    setLoading(true);
                    const jsonValue = await AsyncStorage.getItem('my-books');
                    const books: Book[] = jsonValue != null ? JSON.parse(jsonValue) : [];

                    const foundBook = books.find(b => b.id === Number(id));
                    setBook(foundBook || null);
                } catch (e) {
                    console.error("로딩 에러: ", e);
                } finally {
                    setLoading(false);
                }
            };
            loadBook();
        }, [id]) // 👈 useCallback의 괄호가 여기서 닫혀야 함!
    );

    // 2. [내부 함수] 실제 삭제
    const executeDelete = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-books');
            const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
            const newBooks = books.filter(b => b.id !== Number(id));
            await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));
            router.back(); // 삭제 후 뒤로가기
        } catch (e) {
            console.error("삭제 실패", e);
        }
    };

    // 3. 수정or삭제
    const handleOptions = useCallback(() => {
        Alert.alert(
            "도서 관리",
            "작업을 선택해주세요.",
            [
                { text: "취소", style: "cancel" },
                {
                    text: "수정하기",
                    onPress: () => {
                        // 수정페이지
                        router.push(`/book/edit/${id}`);
                    }
                },
                {
                    text: "삭제하기",
                    style: "destructive", // 빨간색으로 표시 (iOS)
                    onPress: () => {
                        Alert.alert("삭제 확인", "정말 삭제하시겠습니까?", [
                            { text: "취소", style: "cancel" },
                            { text: "삭제", style: "destructive", onPress: executeDelete }
                        ]);
                    }
                }
            ]
        );
    }, [id, router]);

    return { book, loading, handleOptions };
};