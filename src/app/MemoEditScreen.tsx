import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

import { View } from "react-native";

export default function MemoEditScreen() {
  const params = useLocalSearchParams();
  const id = Number(params?.id || 0);
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  useFocusEffect(
    useCallback(() => {
      // [시작] 화면이 활성화(포커스) 되었을 때 실행할 코드 (예: API 데이터 불러오기)
      init();

      return () => {
        // [정리] 다른 화면으로 이동하거나 창이 닫힐 때 실행할 코드 (선택 사항)
        console.log("화면을 벗어났습니다. 상태를 정리합니다.");
      };
    }, [id]), // 의존성 배열에 감시할 상태값을 넣거나, 비워둡니다.
  );

  async function init() {
    /*  */
  }
  async function onSave() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/memo/insert_memo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            nickname: nickname,
            content: content,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("서버 저장 실패");
      }

      const result = await response.json();

      console.log("저장 성공:", result);

      // 저장 후 입력칸 비우기
      setTitle("");
      setNickname("");
      setContent("");
    } catch (error: any) {
      console.log(`!error: `, error?.message);
      alert(`!에러: ${error?.message}`);
    }
  }
  async function onCancle() {}

  return (
    <ScrollView>
      <View>
        <Text>id:{id}</Text>
        <Text>메모작성</Text>
      </View>
      <View>
        <Text>제목:</Text>
        <TextInput
          value={title}
          onChangeText={(e) => {
            setTitle(e);
          }}
        />
      </View>
      <View>
        <Text>닉네임:</Text>
        <TextInput
          value={nickname}
          onChangeText={(e) => {
            setNickname(e);
          }}
        />
      </View>
      <View>
        <Text>내용:</Text>
        <TextInput
          value={content}
          multiline={true}
          numberOfLines={10}
          onChangeText={(e) => {
            setContent(e);
          }}
        />
      </View>
      <View>
        <Button title="저장" onPress={onSave} />
        <Button title="취소" onPress={onCancle} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
