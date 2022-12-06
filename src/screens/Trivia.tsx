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
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../initSupabase";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Trivia">) {
  const { isDarkmode, setTheme } = useTheme();
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    // supabase
    //   .from("random_trivia")
    //   .select("*")
    //   .limit(1)
    //   .single()
    //   .then((payload) => {
    //     console.log(payload.data);
    //     setData({ ...payload.data, loading: false });
    //   });
  }, []);

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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text fontWeight="bold">This is the trivia screen</Text>
      </View>
    </Layout>
  );
}
