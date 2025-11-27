import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardTypeOptions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Book, getRandomColor } from '../utils/bookUtils';
import { styles } from './style';

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
}

const InputField = ({ label, value, onChangeText, placeholder, keyboardType }: InputFieldProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, { paddingBottom: 5 }]}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder || ""}
                keyboardType={keyboardType} // 키패드
            />
        </View>
    );
};


export default function AddBook() {

    const router = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pubYear, setPubYear] = useState('');
    const [location, setLocation] = useState('');
    const [pages, setPages] = useState('');
    const [rating, setRating] = useState(0);

    const isFormValid = title.trim() !== '' && author.trim() !== '' && pages.trim() != '';
    const handleSave = async () => {
        if (!isFormValid) return;

        const newBook: Book = {
            id: Date.now(),
            title,
            author,
            publisher,
            pubYear,
            location,
            rating,
            imageUri, // 이미지 경로
            pages: parseInt(pages) || 0, // 페이지 수 (숫자로 변환만 해서 저장)
            color: getRandomColor(), // 색상은 생성 시점에 정해서 저장 => 이거 수정하는 게 낫지 않나


        };

        try {
            const existingBookJson = await AsyncStorage.getItem('my-books');
            const books = existingBookJson ? JSON.parse(existingBookJson) : [];
            books.push(newBook);
            await AsyncStorage.setItem('my-books', JSON.stringify(books));
            console.log("저장: ", newBook);

            router.back();
        } catch (e) {
            console.error("저장 중 오류 발생: ", e);
        }
    }





    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }

    const drawStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Ionicons
                        name={i <= rating ? "star" : "star-outline"}
                        size={30}
                        color="#FFD700"
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            {/* 1. 최상단헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>책 저장</Text>
                <TouchableOpacity onPress={handleSave} disabled={!isFormValid}>
                    <Text style={[styles.saveButtonText, { color: isFormValid ? '#6200ee' : '#ccc' }]}>Save</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* 2. 이미지선택영역 */}
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
                {/* 3. 정보입력영역 */}
                <InputField
                    label="제목"
                    value={title}
                    onChangeText={setTitle}
                />

                <InputField
                    label="지은이"
                    value={author}
                    onChangeText={setAuthor}
                />

                <InputField
                    label="출판사"
                    value={publisher}
                    onChangeText={setPublisher}
                />

                {/* 연도는 숫자만 입력 */}
                <InputField
                    label="출판 연도"
                    value={pubYear}
                    onChangeText={setPubYear}
                    keyboardType="numeric"
                />

                <InputField
                    label="대출 장소"
                    value={location}
                    onChangeText={setLocation}
                />

                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { paddingBottom: 5 }]}>별점</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {drawStars()}
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}