// hooks/useWriteComment.ts
import { Book, Comment } from '@/utils/bookUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export const useWriteComment = () => {
    const router = useRouter();
    const { id, commentId } = useLocalSearchParams();

    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const isValid = content.trim().length > 0 || selectedImages.length > 0;

    // 1. 초기데이터로딩(수정모드)
    useEffect(() => {
        if (commentId) {
            const loadData = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('my-books');
                    const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
                    const book = books.find(b => b.id === Number(id));
                    const targetComment = book?.comments?.find(c => c.id === Number(commentId));
                    
                    if (targetComment) {
                        setContent(targetComment.content);
                        setSelectedImages(targetComment.images);
                    }
                } catch (e) {
                    console.error("Load Error", e);
                }
            };
            loadData();
        }
    }, [id, commentId]);

    // 2. 이미지 선택
    const pickImages = async () => {
        if (selectedImages.length >= 3) return;
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            selectionLimit: 3 - selectedImages.length,
            quality: 0.8,
        });
        if (!result.canceled) {
            const newUris = result.assets.map(asset => asset.uri);
            setSelectedImages([...selectedImages, ...newUris]);
        }
    };

    // 3. 이미지 삭제
    const removeImage = (indexToRemove: number) => {
        setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
    };

    // 4. 저장
    const handleSave = async () => {
        if (!isValid) return;

        const newComment: Comment = {
            id: commentId ? Number(commentId) : Date.now(),
            content,
            images: selectedImages,
            date: new Date().toLocaleDateString(),
        };

        try {
            const jsonValue = await AsyncStorage.getItem('my-books');
            const books: Book[] = jsonValue ? JSON.parse(jsonValue) : [];
            const newBooks = books.map(book => {
                if (book.id === Number(id)) {
                    let updatedComments;
                    if (commentId) {
                        updatedComments = book.comments?.map(c => c.id === Number(commentId) ? newComment : c);
                    } else {
                        updatedComments = [newComment, ...(book.comments || [])];
                    }
                    return { ...book, comments: updatedComments };
                }
                return book;
            });
            await AsyncStorage.setItem('my-books', JSON.stringify(newBooks));
            router.back();
        } catch (e) {
            console.error("Save Error", e);
        }
    };

    return {
        content, setContent,
        selectedImages, pickImages, removeImage,
        handleSave, isValid,
        isEditing: !!commentId // 수정 모드인지 아닌지
    };
};