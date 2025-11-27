import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';



export default function AddBook() {

    const router = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pubYear, setPubYear] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);

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
                <TouchableOpacity onPress={() => console.log("save")}>
                    <Text style={styles.saveButtonText}>Save</Text>
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
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, {paddingBottom: 5}]}>제목</Text>
                    <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="" />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, {paddingBottom: 5}]}>지은이</Text>
                    <TextInput style={styles.input} value={author} onChangeText={setAuthor} placeholder="" />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, {paddingBottom: 5}]}>출판사</Text>
                    <TextInput style={styles.input} value={publisher} onChangeText={setPublisher} placeholder="" />

                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, {paddingBottom: 5}]}>출판 연도</Text>
                    <TextInput style={styles.input} value={pubYear} onChangeText={setPubYear} placeholder="" />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, {paddingBottom: 5}]}>대출 장소</Text>
                    <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="" />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, {paddingBottom: 5}]}>별점</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {drawStars()}
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}