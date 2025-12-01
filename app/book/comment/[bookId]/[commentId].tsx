import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../../app/style'; // 스타일 확인!
import { Book, Comment } from '../../../../utils/bookUtils'; // 경로 확인!

const { width: screenWidth } = Dimensions.get('window');

export default function CommentDetail() {
    const router = useRouter();
    const { bookId, commentId } = useLocalSearchParams();
    const [comment, setComment] = useState<Comment | null>(null);

    // loading data
    useEffect(() => {
        const loadData = async () => {
            const jsonValue = await AsyncStorage.getItem('my-books');
            const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
            const book = books.find(b => b.id === Number(bookId));
            const foundComment = book?.comments?.find(c => c.id === Number(commentId));
            setComment(foundComment || null);
        };
        loadData();
    }, [bookId, commentId]);

    // deleting data
    const handleDelete = async () => {
        Alert.alert("삭제", "이 기록을 지울까요?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제", style: "destructive", onPress: async () => {
                    const jsonValue = await AsyncStorage.getItem('my-books');
                    const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];

                    const newBooks = books.map(book => {
                        if (book.id === Number(bookId)) {
                            // 해당 코멘트만 쏙 빼고 저장 (Filter)
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

    // 3. Editing
    const handleEdit = () => {
        router.push({
            pathname: "/book/write/[id]",
            params: {
                id: Array.isArray(bookId) ? bookId[0] : bookId,
                commentId: Array.isArray(commentId) ? commentId[0] : commentId
            }
        });
    };

    if (!comment) return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>{comment.date}의 기록</Text>
                {/* 옵션 버튼 (수정/삭제) */}
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <TouchableOpacity onPress={handleEdit}><Ionicons name="create-outline" size={24} color="black" /></TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}><Ionicons name="trash-outline" size={24} color="red" /></TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* 내용 */}
                <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 20 }}>{comment.content}</Text>

                {/* 사진들 */}
                {comment.images.length > 0 && (
                    <View>
                        <ScrollView
                            horizontal // 가로 스크롤
                            pagingEnabled // 한 장씩 딱딱 넘어가게
                            showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
                            style={{ width: screenWidth, height: 400 }} // 높이 지정
                        >
                            {comment.images.map((uri, idx) => (
                                <Image
                                    key={idx}
                                    source={{ uri }}
                                    style={{ width: screenWidth, height: 400 }}
                                    resizeMode="cover"
                                />
                            ))}
                        </ScrollView>

                        {/* (선택사항) 몇 번째 사진인지 표시 */}
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: '#888' }}>
                                {comment.images.length}장의 사진이 있습니다 (옆으로 넘겨보세요)
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}