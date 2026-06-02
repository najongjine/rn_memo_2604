import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

import { View } from "react-native";

export default function MemoEditScreen() {
  const params = useLocalSearchParams();
  const id = Number(params?.id || 0);
  return (
    <ScrollView>
      <View>
        <Text>id:{id}</Text>
        <Text>메모작성</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
