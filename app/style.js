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
        marginTop: 20
        // 스크롤뷰 여유공간
    },
    bookGrid: {
        flexDirection: 'row', // 가로로 배치
        flexWrap: 'wrap',     // 꽉 차면 다음 줄
        justifyContent: 'flex-start', // 왼쪽부터
    },

    shelfContainer: {
        marginBottom: 20, // 다음 선반과의 간격
    },
    // 책공간
    booksRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 20, // 좌우 여백
        zIndex: 1,
        marginBottom: -3,

        alignItems: 'flex-end', // 책 바닥에맞추기
        height: 120, // 책장내부공간(아래의 bookItem 높이랑 맞추면됨) => 이거 변수로 뺄까 var bookheight = 120 둘다수정하기 귀찮은데
    },
    // 책스타일
    bookItem: {
        height: 120,
        marginHorizontal: 2, // 책사이간격
        justifyContent: 'center',
        alignItems: 'center',

        // 모서리
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,

        // 디자인
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,

        // 입체감
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255,255,255,0.3)', // 책등의 하이라이트 효과
        borderRightWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.1)',      // 책등의 그림자 효과
    },
    // [선반바닥
    shelfFloor: {
        height: 25, // 선반 두께 => 졸라두껍게하면 책장같은느낌 나지않을까
        backgroundColor: '#5D4037',
        borderTopWidth: 4,
        borderTopColor: '#4E342E', // 명암
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
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
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "center", // 세로 중앙 정렬
        alignItems: "center",     // 가로 중앙 정렬
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경을 반투명한 검은색으로 (중요!)
    },
    modalView: {
        width: '80%', // 화면 너비의 80% 차지
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    modalBtn: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#6200ee',
    },
    saveButtonText: {
        fontSize: 16,
        color: '#6200ee',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: "#d3d3d3",
    },
    ButtonText: {
        fontWeight: "bold",
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imagePlaceholder: {
        width: 120,
        height: 170,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },
    bookCover: {
        width: 140,
        height: 200,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eee',
    },
    inputContainer: {
        marginBottom: 25,
    },
    label: {
        fontSize: 13,
        color: '#888',
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
    },

})