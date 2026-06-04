import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>홈화면</Text>
      <Button
        title="메모작성"
        onPress={() => navigation.navigate("MemoEditScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
