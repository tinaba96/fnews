import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlastList, FlatList, SafeAreaView} from 'react-native';
import ItemList from '../components/ItemList';
import Constants from 'expo-constants';
import axios from 'axios';

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`
// const URL = 'https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=API_KEY'


export default HomeScreen = ({navigation}) => {

  const [articles, setArticles] = useState([]);
  useEffect(() => {fetchArticles();}, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data = {articles}
        renderItem = {({ item }) => ( <ItemList title
          image = {item.urlToImage}
          title = {item.title}
          author = {item.author}
          click = {() => navigation.navigate('Article', {article: item})}
        />
        )}
        keyExtractor= {(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    backgroundColor: 'grey',
    width: 100,
  },
  rightContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});