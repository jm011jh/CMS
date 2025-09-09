'use client'
import heic2any from 'heic2any';
import { FC, useEffect, useState } from "react";
import SafeImage from './SafeImage';

const HeicThumbnail: FC<{
    fileUrl: string,
    fileName: string,
    sizes?: string,
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}> = ({ fileUrl, fileName, sizes, objectFit = 'contain' }) => {
    const [imageUrl, setImageUrl] = useState(fileUrl);
    const [isConverting, setIsConverting] = useState(false);

    useEffect(() => {
        let createdUrl: string | null = null;

        const processImage = async () => {
            if (fileName.toLowerCase().endsWith('.heic') || fileName.toLowerCase().endsWith('.heif')) {
                setIsConverting(true);
                try {
                    const res = await fetch(fileUrl);
                    if (!res.ok) {
                        throw new Error(`Failed to fetch image: ${res.statusText}`);
                    }
                    const blob = await res.blob();
                    const convertedBlob = await heic2any({ blob, toType: 'image/jpeg' });
                    const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
                    createdUrl = URL.createObjectURL(finalBlob);
                    setImageUrl(createdUrl);
                } catch (error) {
                    console.error('Error converting HEIC to JPEG:', error);
                    setImageUrl(fileUrl); // Fallback on error
                } finally {
                    setIsConverting(false);
                }
            } else {
                setImageUrl(fileUrl);
            }
        };

        processImage();

        return () => {
            if (createdUrl) {
                URL.revokeObjectURL(createdUrl);
            }
        };
    }, [fileUrl, fileName]);

    if (isConverting) {
        return <div>이미지 변경중</div>;
    }

    if (!imageUrl) {
        return null;
    }

    return <SafeImage src={imageUrl} alt={fileName} fill sizes={sizes} objectFit={objectFit} />;
};

export default HeicThumbnail;