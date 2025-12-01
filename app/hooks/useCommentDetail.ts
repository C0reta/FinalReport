// hooks/useCommentDetail.ts
import { Book, Comment } from '@/utils/bookUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export const useCommentDetail = (bookId: string | string[], commentId: string | string[]) => {
    const router = useRouter();
    const [comment, setComment] = useState<Comment | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. 데이터 로딩 (화면 포커스될 때마다!)
    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    setLoading(true);
                    const jsonValue = await AsyncStorage.getItem('my-books');
                    const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
                    const book = books.find(b => b.id === Number(bookId));
                    const foundComment = book?.comments?.find(c => c.id === Number(commentId));
                    setComment(foundComment || null);
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        }, [bookId, commentId])
    );

    // 2. 삭제 로직
    const handleDelete = () => {
        Alert.alert("삭제", "이 기록을 지울까요?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제", style: "destructive", onPress: async () => {
                    const jsonValue = await AsyncStorage.getItem('my-books');
                    const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
                    const newBooks = books.map(book => {
                        if (book.id === Number(bookId)) {
                            return { ...book, comments: book.comments?.filter(c => c.id !== Number(commentId)) };
                        }
                        return book;
                    });
                    await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));
                    router.back();
                }
            }
        ]);
    };

    // 3. 수정 페이지 이동
    const handleEdit = () => {
        router.push({
            pathname: "/book/write/[id]",
            params: {
                id: Array.isArray(bookId) ? bookId[0] : bookId,
                commentId: Array.isArray(commentId) ? commentId[0] : commentId
            }
        });
    };

    return { comment, loading, handleDelete, handleEdit };
};