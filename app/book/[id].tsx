import { Book } from '@/utils/bookUtils';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../style';

export default function Bookdetail() {
    const router = useRouter();

    const { id } = useLocalSearchParams();

    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('my-books');
                const books: Book[] = jsonValue != null ? JSON.parse(jsonValue) : [];

                const foundBook = books.find(b => b.id === Number(id));

                if (foundBook) {
                    setBook(foundBook);
                }
            } catch (e) {
                console.error("로딩 에러: ", e);
            }
        };
        loadBook();
    }, [id]);

    const handleDelete = () => {
        Alert.alert("삭제", "정말 삭제하시겠습니까? ", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: async () => {
                    const jsonValue = await AsyncStorage.getItem('my-books');
                    const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
                    const newBooks = books.filter(b => b.id !== Number(id));

                    await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));
                    router.back();
                }
            }
        ])
    }

    const { width } = Dimensions.get('window');
    const imageSize = width / 3;

    if (!book) return <SafeAreaView>
        <Text>Loading...</Text>
    </SafeAreaView>;

    return (

        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>도서 정보</Text>

                {/* 우측 상단 옵션 버튼 (누르면 삭제 기능 연결) */}
                <TouchableOpacity onPress={handleDelete}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {/* 2. 책정보 */}
                <View style={{ padding: 20, borderBottomWidth: 10, borderColor: '#f5f5f5' }}>
                    <View style={{ marginBottom: 20, elevation: 5, shadowColor: "#000", shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 } }}>
                        {book.imageUri ? (
                            <Image
                                source={{ uri: book.imageUri }}
                                style={{ width: 140, height: 200, borderRadius: 5, backgroundColor: '#eee' }}
                            />
                        ) : (
                            // 이미지가 없을 때 보여줄 회색 박스
                            <View style={{ width: 140, height: 200, borderRadius: 5, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#aaa' }}>No Image</Text>
                            </View>
                        )}
                    </View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{book.title}</Text>
                    <Text style={{ color: '#666', marginTop: 5 }}>{book.author}</Text>
                </View>

                {/* 3. Comment */}
                <View>
                    <Text style={{ padding: 15, fontSize: 18, fontWeight: 'bold' }}>기록 보관소 📸</Text>

                    {/* Gallery */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {/* test dummyData */}
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    width: imageSize,
                                    height: imageSize,
                                    backgroundColor: '#eee',
                                    borderWidth: 1,
                                    borderColor: 'white'
                                }}
                            >
                                {/* dummy image */}
                                <Text style={{ position: 'absolute', bottom: 5, right: 5 }}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* 4. 우측 하단 버튼 */}
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
