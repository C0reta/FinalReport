export interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    pubYear: string;
    location: string;
    rating: number;
    pages: number;
    imageUri: string | null;
    color: string;
}

// 너비계산
export const getBookWidth = (pages: number) => {
    const width = pages / 10;

    // 최소 15 최대 70
    if (width < 15) return 15;
    if (width > 70) return 70;
    return width;
};

export const getRandomColor = () => {
    const colors = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"];
    return colors[Math.floor(Math.random() * colors.length)];
};