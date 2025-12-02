import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../app/style';
import { Book, getRandomColor } from '../utils/bookUtils';
import { InputField } from './InputField';

interface BookFormProps {
    initialData?: Book; // 수정할 때만 데이터가 들어옴
    onSubmit: (book: Book) => void; // 저장 버튼
    submitButtonLabel?: string; // 버튼글씨
}

export const BookForm = ({ initialData, onSubmit, submitButtonLabel = "Save" }: BookFormProps) => {
    // 초기값 세팅: 데이터가 있으면 그거 쓰고, 없으면 빈 값
    const [imageUri, setImageUri] = useState(initialData?.imageUri || null);
    const [title, setTitle] = useState(initialData?.title || '');
    const [author, setAuthor] = useState(initialData?.author || '');
    const [publisher, setPublisher] = useState(initialData?.publisher || '');
    const [pubYear, setPubYear] = useState(initialData?.pubYear || '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [pages, setPages] = useState(initialData?.pages?.toString() || '');
    const [rating, setRating] = useState(initialData?.rating || 0);

    // 필수요소들
    const isFormValid = title.trim() !== '' && author.trim() !== '' && pages.trim() !== '';

    const handlePressSubmit = () => {
        if (!isFormValid) return;

        const bookData: Book = {
            id: initialData?.id || Date.now(), // 있으면 기존 ID, 없으면 새 ID
            title,
            author,
            publisher,
            pubYear,
            location,
            rating,
            imageUri,
            pages: parseInt(pages) || 0,
            color: initialData?.color || getRandomColor(), // 기존 색 유지하거나 새로 뽑기
        };

        onSubmit(bookData);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });
        if (!result.canceled) setImageUri(result.assets[0].uri);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {/* 이미지 선택 */}
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.bookCover} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="camera" size={40} color="#ccc" />
                        <Text style={{ color: '#999', marginTop: 10 }}>표지 추가</Text>
                    </View>
                )}
            </TouchableOpacity>

            <InputField label="제목" value={title} onChangeText={setTitle} />
            <InputField label="지은이" value={author} onChangeText={setAuthor} />
            <InputField label="출판사" value={publisher} onChangeText={setPublisher} />
            <InputField label="출판 연도" value={pubYear} onChangeText={setPubYear} keyboardType="numeric" />
            <InputField label="페이지 수" value={pages} onChangeText={setPages} keyboardType="numeric" />
            <InputField label="대출 장소" value={location} onChangeText={setLocation} />

            {/* 별점 */}
            <View style={styles.inputContainer}>
                <Text style={[styles.label, { paddingBottom: 5 }]}>별점</Text>
                <View style={{ flexDirection: 'row' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <TouchableOpacity key={i} onPress={() => setRating(i)}>
                            <Ionicons name={i <= rating ? "star" : "star-outline"} size={30} color="#FFD700" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* 저장 버튼 */}
            <TouchableOpacity 
                style={[styles.addButton, { position: 'relative', marginTop: 20, width: '100%', height: 50 }]} // 스타일 살짝 커스텀
                onPress={handlePressSubmit} 
                disabled={!isFormValid}
            >
                <Text style={[styles.addButtonText, { fontSize: 18, color: isFormValid ? 'white' : '#ddd' }]}>
                    {submitButtonLabel}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};