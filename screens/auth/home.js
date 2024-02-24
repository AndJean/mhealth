/** @format */

import { View, Text, StatusBar } from "react-native";
import { useCurrentUser } from "../../providers/sessionProvider";

function Home() {
  const { user } = useCurrentUser();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
}

export default Home;
