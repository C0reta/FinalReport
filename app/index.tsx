import { EditShelfModal } from '@/components/EditShelfModal'; // 모달 가져오기
import { Book, getBookWidth, organizeBooksByShelf } from '@/utils/bookUtils'; // 로직 가져오기
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

export default function BookShelf() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [shelfName, setShelfName] = useState("Untitled");
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState(shelfName);

    // 데이터 로딩
    useFocusEffect(
        useCallback(() => {
            const loadBooks = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('my-books');
                    const loadedBooks = jsonValue != null ? JSON.parse(jsonValue) : [];
                    setBooks(loadedBooks);
                } catch (e) {
                    console.error("불러오기 실패: ", e);
                }
            }
            loadBooks();
        }, [])
    );

    const handleEditPress = () => {
        setInputText(shelfName);
        setModalVisible(true);
    }

    const handleSave = () => {
        setShelfName(inputText);
        setModalVisible(false);
    }

    const bookRows = organizeBooksByShelf(books);

    return (
        <SafeAreaView style={styles.container}>

            {/* 모달 */}
            <EditShelfModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSave}
                value={inputText}
                onChangeText={setInputText}
            />

            {/* 헤더 영역 */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.headerTitle}>{shelfName}</Text>
                    <TouchableOpacity onPress={handleEditPress} style={{ paddingLeft: 6, paddingTop: 2 }}>
                        <Ionicons name='pencil' size={16} color='#aaa' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
            </View>

            {/* 책장 영역 */}
            <ScrollView contentContainerStyle={styles.shelfScrollArea}>
                {bookRows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.shelfContainer}>
                        <View style={styles.booksRow}>
                            {row.map((book) => (
                                <TouchableOpacity
                                    key={book.id}
                                    style={[styles.bookItem, { backgroundColor: book.color, width: getBookWidth(book.pages || 0) }]}
                                    onPress={() => router.push(`/book/${book.id}`)}
                                >
                                    {getBookWidth(book.pages || 0) > 15 && (
                                        <Text style={{ fontSize: 10 }} numberOfLines={1}>{book.title}</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.shelfFloor} />
                    </View>
                ))}
            </ScrollView>

            {/* FAB 버튼 */}
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("../AddBook")}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}