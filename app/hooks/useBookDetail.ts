// hooks/useBookDetail.ts
import { Book } from '@/utils/bookUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useBookDetail = (id: string | string[] | undefined) => {
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    // 책 불러오기 로직
    useEffect(() => {
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
    }, [id]);

    // 삭제 로직
    const deleteBook = useCallback(() => {
        Alert.alert("삭제", "정말 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: async () => {
                    try {
                        const jsonValue = await AsyncStorage.getItem('my-books');
                        const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
                        const newBooks = books.filter(b => b.id !== Number(id));
                        await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));
                        router.back();
                    } catch (e) {
                        console.error("삭제 실패", e);
                    }
                }
            }
        ]);
    }, [id, router]);

    return { book, loading, deleteBook };
};