/** @format */

import { View, Text, StatusBar } from "react-native";

function Messages() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Text>Messages</Text>
    </View>
  );
}

export default Messages;
