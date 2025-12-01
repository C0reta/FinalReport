import { Dimensions } from 'react-native';

// 독서 시작일이랑 종료일 넣어보기

export interface Comment {
    id: number;
    content: string;
    images: string[];
    date: string;
}

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
    comments?: Comment[];
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

export const organizeBooksByShelf = (books: Book[]) => {
    const shelves: Book[][] = [];       // 전체 책장 (2차원 배열)
    let currentShelf: Book[] = [];    // 현재 채우고 있는 칸
    let currentWidth = 0;     // 현재 칸에 들어간 책들의 너비 합계

    const screenWidth = Dimensions.get('window').width;
    // 책장 좌우 패딩(20+20=40)을 뺀 실제 책 놓을 공간
    // style.js의 booksRow paddingHorizontal이 20이라서 양쪽 합쳐 40을 뺌
    const shelfCapacity = screenWidth - 70;
    const BOOK_MARGIN = 2; // 책 사이 간격 (marginHorizontal * 2)

    books.forEach((book) => {
        const bookWidth = getBookWidth(book.pages || 0);

        if (currentWidth + bookWidth + BOOK_MARGIN > shelfCapacity) {
            shelves.push(currentShelf);
            currentShelf = [book];
            currentWidth = bookWidth + BOOK_MARGIN;
        } else {
            currentShelf.push(book);
            currentWidth += (bookWidth + BOOK_MARGIN);
        }
    });

    // 반복문 끝나고 마지막에 남은 책들도 책장에 꽂아줘야 함!
    if (currentShelf.length > 0) {
        shelves.push(currentShelf);
    }

    return shelves;
};