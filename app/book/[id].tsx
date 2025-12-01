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

                <View>
                    <Text style={styles.galleryTitle}>Comments</Text>
                    <View style={styles.galleryGrid}>
                        {(book.comments || [])
                            .flatMap(comment => comment.images) // 모든 사진 모으기
                            .map((imgUri, index) => (
                                <View
                                    key={index}
                                    style={[styles.galleryItem, { width: imageSize, height: imageSize }]}
                                >
                                    <Image
                                        source={{ uri: imgUri }}
                                        style={{ width: '100%', height: '100%' }} // 꽉 채우기
                                    />
                                </View>
                            ))}

                        {/* 사진이 하나도 없을 때 안내 문구 */}
                        {(!book.comments || book.comments.flatMap(c => c.images).length === 0) && (
                            <View style={{ padding: 20, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: '#aaa' }}>아직 등록된 사진이 없어요.</Text>
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