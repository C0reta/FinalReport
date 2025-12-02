import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../app/style';

const { width } = Dimensions.get('window');
const photoSize = (width - 60) / 3;

interface ImageUploaderProps {
    images: string[];
    onPick: () => void;
    onRemove: (index: number) => void;
}

export const ImageUploader = ({ images, onPick, onRemove }: ImageUploaderProps) => {
    return (
        // 1. 컨테이너 스타일 적용
        <View style={styles.uploaderContainer}>
            {images.map((uri, index) => (
                <View key={index}>
                    <Image 
                        source={{ uri }} 
                        style={[styles.imageItem, { width: photoSize, height: photoSize }]} 
                    />
                    <TouchableOpacity
                        onPress={() => onRemove(index)}
                        style={styles.deleteBadge} 
                    >
                        <Ionicons name="close-circle" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            ))}
            
            {images.length < 3 && (
                <TouchableOpacity
                    onPress={onPick}
                    style={[styles.addPhotoButton, { width: photoSize, height: photoSize }]}
                >
                    <Ionicons name="camera" size={24} color="#aaa" />
                    <Text style={styles.addPhotoText}>
                        {images.length}/3
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};