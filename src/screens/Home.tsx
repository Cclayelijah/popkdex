import React from "react";
import { View, Linking, Image } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  SectionImage,
} from "react-native-rapi-ui";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 20,
        }}
      >
        <Section
          style={{ width: "100%", marginBottom: 20 }}
          onTouchEnd={() => navigation.navigate("Groups")}
        >
          <SectionContent
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              size="xl"
              fontWeight="bold"
              style={{
                display: "flex",
              }}
            >
              Groups
            </Text>
            <AntDesign
              name="rightcircle"
              size={24}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
              style={{ display: "flex" }}
            />
          </SectionContent>
        </Section>
        <Section
          style={{ width: "100%", marginBottom: 20 }}
          onTouchEnd={() => navigation.navigate("Idols")}
        >
          <SectionContent
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              size="xl"
              fontWeight="bold"
              style={{
                display: "flex",
              }}
            >
              Idols
            </Text>
            <AntDesign
              name="rightcircle"
              size={24}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
              style={{ display: "flex" }}
            />
          </SectionContent>
        </Section>
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <Section onTouchEnd={() => navigation.navigate("Wish")}>
          <SectionContent style={{ alignItems: "center", paddingVertical: 40 }}>
            <FontAwesome5
              name="hand-sparkles"
              size={80}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          </SectionContent>
        </Section>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          text="Trivia"
          size="lg"
          rightContent={
            <Ionicons name="arrow-forward" size={20} color={themeColor.white} />
          }
          type="TouchableOpacity"
          onPress={() => navigation.navigate("Trivia")}
        />
      </View>
    </Layout>
  );
}
