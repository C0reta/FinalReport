import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

const dummyBooks = [
    { id: 1, title: "책1", color: "#FF9AA2", height: 100, width: 40 }, // 두꺼운 책
    { id: 2, title: "책2", color: "#FFB7B2", height: 120, width: 25 },
    { id: 3, title: "책3", color: "#FFDAC1", height: 90, width: 15 },  // 얇은 책
    { id: 4, title: "책4", color: "#E2F0CB", height: 110, width: 30 },
    { id: 5, title: "책5", color: "#B5EAD7", height: 115, width: 50 }, // 아주 두꺼운 책
    { id: 6, title: "책6", color: "#C7CEEA", height: 105, width: 20 },
    { id: 7, title: "책7", color: "#FF9AA2", height: 125, width: 35 },
    { id: 8, title: "책8", color: "#FFB7B2", height: 95, width: 25 },
    { id: 9, title: "책9", color: "#E2F0CB", height: 100, width: 45 },
    { id: 10, title: "책10", color: "#B5EAD7", height: 110, width: 30 },
    { id: 11, title: "책11", color: "#C7CEEA", height: 110, width: 20 },
];
const screenWidth = Dimensions.get('window').width;

const organizeBooksByShelf = (books: any[]) => {
    const shelves = [];       // 전체 책장 (2차원 배열)
    let currentShelf: any[] = [];    // 현재 채우고 있는 칸
    let currentWidth = 0;     // 현재 칸에 들어간 책들의 너비 합계

    // 책장 좌우 패딩(20+20=40)을 뺀 실제 책 놓을 공간
    // style.js의 booksRow paddingHorizontal이 20이라서 양쪽 합쳐 40을 뺌
    const shelfCapacity = screenWidth - 70;

    const BOOK_MARGIN = 2; // 책 사이 간격 (marginHorizontal * 2)

    books.forEach((book) => {
        // (현재 쌓인 너비 + 새 책의 너비 + 책 사이 간격)이 선반보다 크면?
        if (currentWidth + book.width + BOOK_MARGIN > shelfCapacity) {
            // 1. 지금 칸을 완성해서 책장에 꽂음
            shelves.push(currentShelf);
            // 2. 새 칸(배열)을 꺼내고, 지금 책을 거기에 넣음
            currentShelf = [book];
            currentWidth = book.width + BOOK_MARGIN;
        } else {
            // 아직 공간 남았으면 계속 넣음
            currentShelf.push(book);
            currentWidth += (book.width + BOOK_MARGIN);
        }
    });

    // 반복문 끝나고 마지막에 남은 책들도 책장에 꽂아줘야 함!
    if (currentShelf.length > 0) {
        shelves.push(currentShelf);
    }

    return shelves;
};

export default function BookShelf() {

    const router = useRouter();

    const [shelfName, setShelfName] = useState("Untitled");
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState(shelfName);

    const handleEditPress = () => {
        setInputText(shelfName);
        setModalVisible(true);
    }

    const handleSave = () => {
        setShelfName(inputText);
        setModalVisible(false);
    }
    const bookRows = organizeBooksByShelf(dummyBooks);

    return (
        // 전체뷰
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="fade" // 모달이 나타날 때 효과 (slide, fade, none)
                transparent={true}    // 배경을 투명하게 해서 뒤가 보이게 함
                visible={modalVisible} // 이 값이 true일 때만 보임
                onRequestClose={() => setModalVisible(false)} // 안드로이드 뒤로가기 키 대응
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>책장 이름 변경</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={setInputText}
                            value={inputText}
                            placeholder="이름을 입력하세요"
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.ButtonText}>취소</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalBtn, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={[styles.ButtonText, { color: 'white' }]}>저장</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* 상단 헤딩바 */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.headerTitle}>{shelfName}</Text>
                    <TouchableOpacity onPress={handleEditPress} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 6, paddingTop: 2 }}>
                        <Ionicons name='pencil' size={10} color='black'/>
                    </TouchableOpacity>
                </View>

                {/*추후 재사용*/}
                <TouchableOpacity>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
            </View>
            {/* 책장 꽂는곳... */}
            <ScrollView contentContainerStyle={styles.shelfScrollArea}>
                {bookRows.map((row, rowIndex) => (
                    // 1. 선반컨테이너
                    <View key={rowIndex} style={styles.shelfContainer}>

                        {/* 책장내부 */}
                        <View style={styles.booksRow}>
                            {/* 책들 */}
                            {row.map((book) => (
                                <TouchableOpacity
                                    key={book.id}
                                    // 책너비
                                    style={[styles.bookItem, { backgroundColor: book.color, width: book.width, }]}
                                    onPress={() => console.log(book.title)}
                                >
                                    <Text>{book.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* 선반바닥 */}
                        <View style={styles.shelfFloor} />
                    </View>
                ))}
            </ScrollView>
            {/* 최하단 바닥 */}
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/AddBook")}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

// 끝!