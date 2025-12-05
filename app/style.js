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
    fab: {
        position: 'absolute', // 공중에 띄우기
        right: 20,
        bottom: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
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
        borderLeftColor: 'rgba(255,255,255,0.3)', // 책등하이라이트
        borderRightWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.1)',      // 책등그림자
    },
    // 선반바닥
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
        marginTop: -2,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",     
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: '80%',
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
    bookInfoContainer: {
        padding: 20,
        borderBottomWidth: 10,
        borderColor: '#f5f5f5',
        alignItems: 'center',
    },
    bookCoverShadow: {
        marginBottom: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    detailBookCover: {
        width: 140,
        height: 200,
        borderRadius: 5,
        backgroundColor: '#eee',
    },
    noImagePlaceholder: {
        width: 140,
        height: 200,
        borderRadius: 5,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    detailAuthor: {
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    galleryTitle: {
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    galleryItem: {
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: 'white',
    },
    galleryText: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },

    uploaderContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 10,
    },
    imageItem: {
        borderRadius: 10,
    },
    deleteBadge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: 'black',
        borderRadius: 10,
        zIndex: 1, // 이미지가 겹칠 때 위로 오라고
    },
    addPhotoButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhotoText: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 4,
    },
    bookTitleVertical: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        width: 120,
        transform: [{ rotate: '90deg' }] 
    }

})