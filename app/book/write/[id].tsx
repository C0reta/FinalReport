import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../app/style';
import { ImageUploader } from '../../../components/ImageUploader';
import { useWriteComment } from '../../hooks/useWriteComment';

export default function WriteComment() {
    const router = useRouter();
    
    const { 
        content, setContent, 
        selectedImages, pickImages, removeImage, 
        handleSave, isValid, isEditing 
    } = useWriteComment();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditing ? "코멘트 수정" : "코멘트 남기기"}</Text>
                <TouchableOpacity onPress={handleSave} disabled={!isValid}>
                    <Text style={[styles.saveButtonText, { color: isValid ? '#6200ee' : '#ccc' }]}>완료</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                
                <ImageUploader 
                    images={selectedImages} 
                    onPick={pickImages} 
                    onRemove={removeImage} 
                />

                <Text style={{ color: '#aaa', fontSize: 12, marginTop: 20 }}>
                    * 사진을 등록하지 않으면 대표 이미지가 자동으로 표시됩니다.
                </Text>

                {/* 텍스트 입력 */}
                <TextInput
                    style={{ fontSize: 16, minHeight: 100, textAlignVertical: 'top', marginTop: 20 }}
                    multiline
                    placeholder="메모 남기기"
                    value={content}
                    onChangeText={setContent}
                />
            </ScrollView>
        </SafeAreaView>
    );
}