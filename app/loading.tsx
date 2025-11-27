import { Text, View } from "react-native";
import { styles } from './style';


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center", backgroundColor: "#DCDCDC"
      }}
    >
      <Text style={styles.text_st}>Diving into the Bookshelf...</Text>
    </View>
  );
}

// 끝!