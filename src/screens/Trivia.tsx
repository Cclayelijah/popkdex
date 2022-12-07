import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Section,
  SectionContent,
  SectionImage,
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../initSupabase";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Trivia">) {
  const { isDarkmode, setTheme } = useTheme();
  const [data, setData] = useState({ loading: true, answer: "" });

  useEffect(() => {
    supabase
      .from("random_trivia")
      .select("*")
      .limit(1)
      .single()
      .then((payload) => {
        console.log(payload.data);
        setData({ ...payload.data, loading: false });
      });
  }, []);

  const checkAnswer = (guess: string) => {
    if (data.loading) return 0;
    if (guess == data.answer) {
      console.log("That's correct!");
    } else {
      console.log("Wrong.");
    }
  };

  return (
    <Layout>
      <TopNav
        middleContent="Trivia"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
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
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Section style={{ width: "100%" }} borderRadius={0}>
          <SectionImage
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/24/Blackpink_PUBG_210321.jpg",
            }}
          />
          <SectionContent>
            <Text size="xl">question text goes here.</Text>
          </SectionContent>
        </Section>
        <Section style={{ width: "100%", padding: 20 }}>
          <Button text={"bob"} style={{ marginTop: 20 }} />
          <Button text={"dylan"} style={{ marginTop: 20 }} />
          <Button text={"chris"} style={{ marginTop: 20 }} />
          <Button text={"hymerdinger"} style={{ marginTop: 20 }} />
        </Section>
      </View>
    </Layout>
  );
}
