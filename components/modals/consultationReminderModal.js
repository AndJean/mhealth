import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Dimensions,
  } from "react-native";
  import Modal from "react-native-modal"
  import color from "../../constants/colors"
  import { Ionicons } from "@expo/vector-icons";
  import { useTranslation } from "react-i18next";

function ConsultationReminderModal({ setShowModal, consultationInfos }) {
    const { t } = useTranslation()
  
    return (
      <Modal
        isVisible
        backdropOpacity={0.4}
        deviceHeight={Dimensions.get("screen").height}
        backdropTransitionOutTiming={0}
        useNativeDriver
        statusBarTranslucent
      >
        <View
          style={{
            height: 400,
            width: "100%",
            borderRadius: 30,
            paddingHorizontal: 30,
            paddingVertical: 15,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
            <View
                style={{
                    marginTop: 40,
                    borderRadius: 120,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    backgroundColor: "rgb(238, 238, 238)",
                }}
            >
                <Ionicons name="checkmark-sharp" size={80} color={color.base} />
            </View>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 35,
                    textAlign: "center",
                }}
            >
                {t("consultationReminderModal.title")}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    marginTop: 10,
                    textAlign: "center",
                    opacity: 0.7,
                }}
            >
                {t("consultationReminderModal.text1") }
            </Text>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5, elevation: 5, marginTop: 15, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 100, backgroundColor: color.base}}>
                <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>{t('consultationReminderModal.button')}</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    );
  }

export default ConsultationReminderModal