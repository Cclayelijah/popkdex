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
}: NativeStackScreenProps<MainStackParamList, "Trivia">) {
  const auth = useContext(AuthContext);
  const uuid = auth.session?.user?.id;
  const { isDarkmode, setTheme } = useTheme();
  const [data, setData] = useState({
    loading: true,
    answer: "",
    a: "",
    b: "",
    c: "",
    d: "",
    question: "",
    image: "",
    difficulty: 0,
  });
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState(Boolean);
  const [rewardText, setRewardText] = useState("");
  const [stardust, setStardust] = useState(-1);
  //const startTime = dayjs();

  useEffect(() => {
    supabase
      .from("random_trivia")
      .select("*")
      .limit(1)
      .single()
      .then((payload) => {
        setData({ ...payload.data, loading: false });
      });

    supabase
      .from("profiles")
      .select("stardust")
      .eq("id", uuid)
      .single()
      .then((payload) => {
        console.log(payload.error);
        const num = payload.data.stardust;
        setStardust(num);
      });
  }, []);

  const rewardStardust = (amount: number) => {};

  const checkAnswer = async (guess: string) => {
    if (data.loading || stardust < 0) return 0;
    if (guess == data.answer) {
      // correct
      const step = stardust + 1;
      setCorrect(true);
      await supabase
        .from("profiles")
        .update({ stardust: step })
        .eq("id", uuid)
        .then((payload) => {
          setStardust(step);
          setRewardText("You were rewarded 1 stardust.");
        });
    } else {
      // wrong
      setCorrect(false);
    }
    setGuess(guess);
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
        rightContent={stardust >= 0 && <Text>{stardust}</Text>}
      />
      {data.loading ? (
        <Loading />
      ) : (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Section style={{ width: "100%" }} borderRadius={0}>
            <SectionImage
              source={{
                uri: data.image,
              }}
            />
            <SectionContent>
              <Text size="xl">{data.question}</Text>
            </SectionContent>
          </Section>
          <Section style={{ width: "100%", padding: 20 }}>
            <Button
              key="a"
              text={data.a}
              style={{ marginTop: 20 }}
              onPress={() => checkAnswer("a")}
              status={
                guess === "a" ? (correct ? "success" : "danger") : "primary"
              }
              disabled={guess != "a" && guess != "" ? true : false}
            />
            <Button
              key="b"
              text={data.b}
              style={{ marginTop: 20 }}
              onPress={() => checkAnswer("b")}
              status={
                guess === "b" ? (correct ? "success" : "danger") : "primary"
              }
              disabled={guess != "b" && guess != "" ? true : false}
            />
            <Button
              key="c"
              text={data.c}
              style={{ marginTop: 20 }}
              onPress={() => checkAnswer("c")}
              status={
                guess === "c" ? (correct ? "success" : "danger") : "primary"
              }
              disabled={guess != "c" && guess != "" ? true : false}
            />
            <Button
              key="d"
              text={data.d}
              style={{ marginTop: 20 }}
              onPress={() => checkAnswer("d")}
              status={
                guess === "d" ? (correct ? "success" : "danger") : "primary"
              }
              disabled={guess != "d" && guess != "" ? true : false}
            />
          </Section>
        </View>
      )}
      {guess != "" && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {correct ? (
            <>
              <Text>Correct!</Text>
              {rewardText != "" && <Text>{rewardText}</Text>}
            </>
          ) : (
            <Text>The correct answer is {data.answer}.</Text>
          )}
        </View>
      )}
    </Layout>
  );
}
