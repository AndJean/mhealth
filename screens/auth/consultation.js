/** @format */

import { View, Text, StatusBar } from "react-native";

function Consultation() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Text
        style={{
          paddingTop: 20,
          marginHorizontal: 15,
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        Consultation
      </Text>
    </View>
  );
}

export default Consultation;
