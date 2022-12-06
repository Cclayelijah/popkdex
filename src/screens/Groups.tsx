import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Section,
  SectionImage,
  SectionContent,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import { SUPABASE_KEY } from "@env";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Groups">) {
  const { isDarkmode, setTheme } = useTheme();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios
      .get("https://nyeesvbdynkaiyrnljwd.supabase.co/rest/v1/group", {
        params: {
          select: "name,image",
        },
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: "Bearer " + SUPABASE_KEY,
        },
      })
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <TopNav
        middleContent="Groups"
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
      <ScrollView>
        <View
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 20,
          }}
        >
          <Text fontWeight="bold">This is the groups screen</Text>
          {groups.length > 0 &&
            groups.map((group: any, id) => {
              console.log(group.name);
              return (
                <Section key={id} style={{ width: "100%", marginTop: 20 }}>
                  <SectionImage source={{ uri: group.image }} />
                  <SectionContent>
                    <Text>{group.name}</Text>
                  </SectionContent>
                </Section>
              );
            })}
        </View>
      </ScrollView>
    </Layout>
  );
}
