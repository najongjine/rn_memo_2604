import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Memo = {
  id: number;
  title: string;
  content: string;
  nickname: string;
};
export default function HomeScreen() {
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMemoList = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:3000/api/memo`);
      const json = await res.json();

      if (json.success === true) {
        setMemoList(json.data);
      } else {
        console.log("메모 목록 조회 실패:", json.msg);
      }
    } catch (e) {
      console.log("서버 통신 에러:", e);
    } finally {
      setLoading(false);
    }
  };
  async function init() {
    await fetchMemoList();
  }
  useFocusEffect(
    useCallback(() => {
      // [시작] 화면이 활성화(포커스) 되었을 때 실행할 코드 (예: API 데이터 불러오기)
      init();

      return () => {
        // [정리] 다른 화면으로 이동하거나 창이 닫힐 때 실행할 코드 (선택 사항)
        console.log("화면을 벗어났습니다. 상태를 정리합니다.");
      };
    }, []), // 의존성 배열에 감시할 상태값을 넣거나, 비워둡니다.
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>메모 목록</Text>

      <Button
        title="메모작성"
        onPress={() => navigation.navigate("MemoEditScreen")}
      />

      {loading && <ActivityIndicator style={styles.loading} />}

      <FlatList
        data={memoList}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.memoItem}
            onPress={() =>
              router.push({
                pathname: "/MemoEditScreen",
                params: {
                  id: String(item.id),
                },
              })
            }
          >
            <Text style={styles.memoTitle}>{item.title}</Text>
            <Text style={styles.memoContent} numberOfLines={2}>
              {item.content}
            </Text>
            <Text style={styles.nickname}>작성자: {item.nickname}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loading: {
    marginTop: 20,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  memoItem: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  memoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  memoContent: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  nickname: {
    fontSize: 12,
    color: "#888",
  },
});
