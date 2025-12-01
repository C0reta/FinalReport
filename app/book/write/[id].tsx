import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../app/style';
import { Book, Comment } from '../../../utils/bookUtils'; // 경로 확인!


const { width } = Dimensions.get('window');
const photoSize = (width - 60) / 3;

export default function WriteComment() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const isValid = content.trim().length > 0 || selectedImages.length > 0;

    // select images
    const pickImages = async () => {
        if (selectedImages.length >= 3) {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            selectionLimit: 3 - selectedImages.length,
            quality: 0.8,
        });

        if (!result.canceled) {
            const newUris = result.assets.map(asset => asset.uri);
            setSelectedImages([...selectedImages, ...newUris]); // 얜뭐야? 갑자기웬점?
        }
    };

    // delete selected iamges
    const removeImage = (indexToRemove: number) => {
        setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
    }

    // save
    const handleSave = async () => {
        if (!content.trim() && selectedImages.length === 0) {
            Alert.alert("내용을 입력하거나 사진을 추가해주세요.");
            // 걍 알람으로 할게아니라 등록버튼을 비활성화하면 되는 거 아닌가
            return;
        }

        const newComment: Comment = {
            id: Date.now(),
            content,
            images: selectedImages,
            date: new Date().toLocaleDateString(),

        };

        try {
            const jsonValue = await AsyncStorage.getItem('my-books');
            const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];

            const newBooks = books.map(book => {
                if (book.id === Number(id)) {
                    return {
                        ...book,
                        comments: [newComment, ...(book.comments || [])]
                    };
                }
                return book;
            });

            await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));

            router.back();

        } catch (e) {
            console.error("저장 실패", e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>기록 남기기</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={[styles.saveButtonText, { color: isValid ? '#6200ee' : '#ccc' }]}>완료</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>


                {/* 사진 미리보기 영역 */}
                <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
                    {selectedImages.map((uri, index) => (
                        <View key={index}>
                            <Image source={{ uri }} style={{ width: photoSize, height: photoSize, borderRadius: 10 }} />
                            {/* 삭제 버튼 */}
                            <TouchableOpacity
                                onPress={() => removeImage(index)}
                                style={{ position: 'absolute', right: -5, top: -5, backgroundColor: 'black', borderRadius: 10 }}
                            >
                                <Ionicons name="close-circle" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {/* 사진추가 버튼 */}
                    {selectedImages.length < 3 && (
                        <TouchableOpacity
                            onPress={pickImages}
                            style={{
                                width: photoSize, height: photoSize,
                                borderRadius: 10, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed',
                                justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <Ionicons name="camera" size={24} color="#aaa" />
                            <Text style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>
                                {selectedImages.length}/3
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={{ color: '#aaa', fontSize: 12, marginTop: 20 }}>
                    * 사진을 등록하지 않으면 책의 대표 이미지가 자동으로 표시됩니다.
                </Text>

                {/* 텍스트 입력 */}
                <TextInput
                    style={{ fontSize: 16, minHeight: 100, textAlignVertical: 'top' }}
                    multiline
                    placeholder="comment"
                    value={content}
                    onChangeText={setContent}
                />


            </ScrollView>
        </SafeAreaView>
    )
}