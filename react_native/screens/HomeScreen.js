import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, FlastList, FlatList, SafeAreaView, Text} from 'react-native';
import ItemList from '../components/ItemList';
import FilterCategory from '../components/FilterCategory';
import Constants from 'expo-constants';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import DropDownPicker from 'react-native-dropdown-picker';

category = '';
// const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`
// const URL = `https://newsapi.org/v2/top-headlines?country=jp&language=en&category=sports&apiKey=${Constants.manifest.extra.newsApiKey}`
const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=${category}&apiKey=${Constants.manifest.extra.newsApiKey}`

console.log({category})

export default HomeScreen = ({navigation}) => {

  const [articles, setArticles] = useState([]);
  useEffect(() => {fetchArticles();}, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'business', value: 'business'},
    {label: 'entertainment', value: 'entertainment'},
    {label: 'general', value: 'general'},
    {label: 'health', value: 'health'},
    {label: 'science', value: 'science'},
    {label: 'sports', value: 'sports'},
    {label: 'technology', value: 'technology'}
  ]);

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
      {/* <FilterCategory/> */}
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value) => {
        console.log(value);
        category = value
        webviewRef.current.reload();
      }}
    />
      <FlatList
        data = {articles}
        renderItem = {({ item }) => ( 
        <ItemList title
          image = {item.urlToImage}
          title = {item.title}
          author = {item.author}
          publishedAt = {item.publishedAt}
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