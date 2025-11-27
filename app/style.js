import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    text_st: {
        fontSize: 16,
        color: '#000000'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: 60,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        fontSize: 16,
        color: 'blue',
    },
    shelfScrollArea: {
        padding: 10,
        // 스크롤뷰 여유공간
    },
    bookGrid: {
        flexDirection: 'row', // 가로로 배치
        flexWrap: 'wrap',     // 꽉 차면 다음 줄
        justifyContent: 'flex-start', // 왼쪽부터
    },
    bookItem: {
        width: '30%',         // 화면 너비의 30% 정도 차지 (한 줄에 3개 정도 들어감)
        height: 120,          // 책 높이
        margin: '1.5%',       // 책 사이 간격
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    addButton: {
        position: 'absolute', // 공중에 띄우기
        right: 20,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,     // 동그라미 만들기
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
        marginTop: -2, // 텍스트 중앙 정렬 미세 조정
    }

})