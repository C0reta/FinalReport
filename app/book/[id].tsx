import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookDetail } from '../hooks/useBookDetail'; // 훅 import
import { styles } from '../style';

export default function BookDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const { book, loading, handleOptions } = useBookDetail(id);

    const { width } = Dimensions.get('window');
    const imageSize = width / 3;

    if (loading || !book) return (
        <SafeAreaView style={styles.container}>
            <Text>Loading...</Text>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>도서 정보</Text>

                {/* 2. 수정버튼 */}
                <TouchableOpacity onPress={handleOptions}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.bookInfoContainer}>
                    <View style={styles.bookCoverShadow}>
                        {book.imageUri ? (
                            <Image
                                source={{ uri: book.imageUri }}
                                style={styles.detailBookCover}
                            />
                        ) : (
                            <View style={styles.noImagePlaceholder}>
                                <Text style={{ color: '#aaa' }}>No Image</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.detailTitle}>{book.title}</Text>
                    <Text style={styles.detailAuthor}>{book.author}</Text>
                </View>

                // app/book/[id].tsx 수정

                <View>
                    <Text style={styles.galleryTitle}>Comments</Text>
                    <View style={styles.galleryGrid}>
                        {(book.comments || [])
                            // 1. [수정] 사진이 있는 코멘트만 골라내서 -> 첫 번째 사진만 가져오기!
                            .filter(comment => comment.images && comment.images.length > 0)
                            .map((comment) => ({
                                uri: comment.images[0], // 📸 대표 사진 (첫 번째 거)
                                commentId: comment.id,
                                count: comment.images.length // (선택사항) 사진이 몇 장인지 정보
                            }))
                            .map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.galleryItem, { width: imageSize, height: imageSize }]}
                                    onPress={() => router.push({
                                        pathname: "/book/comment/[bookId]/[commentId]",
                                        params: { bookId: Array.isArray(id) ? id[0] : id, commentId: item.commentId }
                                    })}
                                >
                                    <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%' }} />

                                    {/* (옵션) 인스타처럼 사진이 여러 장이면 아이콘 표시해 주기 */}
                                    {item.count > 1 && (
                                        <View style={{ position: 'absolute', top: 5, right: 5 }}>
                                            <Ionicons name="layers" size={16} color="white" style={{ shadowColor: 'black', shadowRadius: 2 }} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}

                        {/* 코멘트 자체가 없거나, 사진 있는 코멘트가 없을 때 */}
                        {(!book.comments || !book.comments.some(c => c.images.length > 0)) && (
                            <View style={{ padding: 20, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: '#aaa' }}>아직 등록된 사진 기록이 없어요.</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => router.push(`/book/write/${id}`)}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>

        </SafeAreaView>
    );
}