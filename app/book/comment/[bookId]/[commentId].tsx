import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../../app/style';
import { ImageCarousel } from '../../../../components/ImageCarousel';
import { useCommentDetail } from '../../../hooks/useCommentDetail';

export default function CommentDetail() {
    const router = useRouter();
    const { bookId, commentId } = useLocalSearchParams();

    const { comment, loading, handleDelete, handleEdit } = useCommentDetail(bookId, commentId);

    if (loading || !comment) return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{comment.date}</Text> // 이거 작성 시간도 추가되게 바꿀까
                
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <TouchableOpacity onPress={handleEdit}>
                        <Ionicons name="create-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Ionicons name="trash-outline" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 16, lineHeight: 24 }}>{comment.content}</Text>
                </View>
                <ImageCarousel images={comment.images} />
            </ScrollView>
        </SafeAreaView>
    );
}