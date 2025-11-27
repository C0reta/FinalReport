import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

const dummyBooks = [
    { id: 1, title: "책1", color: "#FF9AA2" },
    { id: 2, title: "책2", color: "#FFB7B2" },
    { id: 3, title: "책3", color: "#FFDAC1" },
    { id: 4, title: "책4", color: "#E2F0CB" },
    { id: 5, title: "책5", color: "#B5EAD7" },
    // ... 책이 많아지면 스크롤 되는지 확인해 봐!
];

export default function BookShelf() {

    const [shelfName, setShelfName] = useState("Untitled");

    return (
        // 전체뷰
        <SafeAreaView style={styles.container}>
            // 상단 헤딩바
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{shelfName}</Text>
                <TouchableOpacity onPress={() => console.log("책장이름수정")}>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
            </View>
            // 책장 꽂는곳...
            <ScrollView contentContainerStyle={styles.shelfScrollArea}>
                <View style={styles.bookGrid}>
                    {dummyBooks.map((book) => (
                        <View key={book.id} style={[styles.bookItem, { backgroundColor: book.color }]}>
                            <Text>{book.title}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            // 최하단 버튼
            <TouchableOpacity style={styles.addButton} onPress={() => console.log("책추가")}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

// 끝!