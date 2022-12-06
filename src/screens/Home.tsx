import React from "react";
import { View, Linking } from "react-native";
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
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
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
        <Section style={{ width: "100%", marginBottom: 20 }}>
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
              onPress={() => navigation.navigate("Groups")}
            />
          </SectionContent>
        </Section>
        <Section style={{ width: "100%", marginBottom: 20 }}>
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
              onPress={() => navigation.navigate("Idols")}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
