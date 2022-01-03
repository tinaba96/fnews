import React, { useState, useEffect, useRef } from "react";

import {
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import ListItem from "../components/ListItem";
import Constants from "expo-constants";
import axios from "axios";
import Loading from "../components/Loading";

const URL = `https://newsapi.org/v2/everything?q=&apiKey=${Constants.manifest.extra.newsApiKey}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pageRef = useRef(1);
  const fetchedAllRef = useRef(false);

  useEffect(() => {
    setLoading(true);
    fetchArticles(1);
  }, []);

  const fetchArticles = async (page) => {
    try {
      const response = await axios.get(`${URL}&page=${page}`);
      if (response.data.articles.length > 0) {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      } else {
        fetchedAllRef.current = true;
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onEndReached = () => {
    if (!fetchedAllRef.current) {
      pageRef.current = pageRef.current + 1;
      fetchArticles(pageRef.current);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setArticles([]);
    pageRef.current = 1;
    fetchedAllRef.current = false;
    await fetchArticles(1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView styles={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            publishedAt={item.publishedAt}
            onPress={() =>
              navigation.navigate("Article", {
                article: item,
              })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};
