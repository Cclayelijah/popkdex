import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";
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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { supabase } from "../initSupabase";
import dayjs from "dayjs";
import Loading from "./utils/Loading";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Wish">) {
  const auth = useContext(AuthContext);
  const uuid = auth.session?.user?.id;
  const { isDarkmode, setTheme } = useTheme();
  const [memberID, setMemberID] = useState(0);
  const [pc, setPC] = useState({});
  const [loading, setLoading] = useState(true);
  const [stardust, setStardust] = useState(-1);
  const [rewardText, setRewardText] = useState("");
  //const startTime = dayjs();

  useEffect(() => {
    supabase
      .from("profiles")
      .select("stardust")
      .eq("id", uuid)
      .single()
      .then((payload) => {
        const num = payload.data.stardust;
        setStardust(num);
      });
    setLoading(false);
  }, []);

  const selectMember = async () => {
    await supabase
      .from("random_members")
      .select("id")
      .limit(1)
      .single()
      .then((payload) => {
        console.log(payload.data.id);
        setMemberID(payload.data.id);
      });
  };

  const spendStardust = async () => {
    const subtract = stardust - 1;
    await supabase
      .from("profiles")
      .update({ stardust: subtract })
      .eq("id", uuid)
      .then((payload) => {
        setStardust(subtract);
        setRewardText("You got a new Photo Card!");
      });
  };

  const newPC = async () => {
    // check if pc already exists for user
    const { data, error } = await supabase
      .from("idols")
      .select("*")
      .limit(1)
      .eq("memberID", memberID)
      .eq("userID", uuid)
      .single();

    if (error) console.log(error);
    if (data) {
      // if it does, update the stacks
      console.log(data);
      await supabase
        .from("idols")
        .update({ stacks: data.stacks + 1 })
        .eq("memberID", memberID)
        .eq("userID", uuid)
        .select()
        .then((payload) => {
          console.log(payload.data);
        });
    } else {
      // otherwise, insert new
      await supabase
        .from("idols")
        .insert([{ userID: uuid, memberID: memberID }])
        .then((payload) => {
          if (payload.error) console.log(error);
          console.log(payload.data);
        });
    }
  };

  const pull = async () => {
    setLoading(true);
    //selectMember();
    spendStardust();
    //newPC();
    setLoading(false);
  };

  return (
    <Layout>
      <TopNav
        middleContent="Wish"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={stardust >= 0 && <Text>{stardust}</Text>}
      />
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && <Loading />}
        {rewardText != "" && <Text>{rewardText}</Text>}
      </View>
      <View style={{ padding: 20 }}>
        <Section onTouchEnd={() => pull()}>
          <SectionContent style={{ alignItems: "center", paddingVertical: 40 }}>
            <FontAwesome5
              name="hand-sparkles"
              size={80}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
