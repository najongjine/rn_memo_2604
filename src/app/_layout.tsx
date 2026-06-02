import { useColorScheme } from "react-native";

import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "홈" }} />
    </Tabs>
  );
}
