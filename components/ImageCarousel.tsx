// components/ImageCarousel.tsx
import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ImageCarouselProps {
    images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
    if (!images || images.length === 0) return null;

    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ width: screenWidth, height: 400 }}
            >
                {images.map((uri, idx) => (
                    <Image
                        key={idx}
                        source={{ uri }}
                        style={{ width: screenWidth, height: 400 }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
            
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: '#888' }}>
                    {images.length}장의 사진
                </Text>
            </View>
        </View>
    );
};