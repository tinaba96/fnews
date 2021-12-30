import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlastList, FlatList, SafeAreaView} from 'react-native';
import ItemList from './components/ItemList';
import testArticles from './testData/articles';
import Constants from 'expo-constants';


export default function App() {
  const [articles, setArticles] = useState(testArticles)
  useEffect(() => {alert(Constants.manifest.extra.newsApiKey)}, [])
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data = {articles}
        renderItem = {({ item }) => ( <ItemList title
          image = {item.urlToImage}
          title = {item.title}
          author = {item.author}
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