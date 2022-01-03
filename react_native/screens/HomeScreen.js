import React, {useState, useEffect, useRef} from 'react';
import {TextInput, StyleSheet, View, FlastList, FlatList, SafeAreaView, Text} from 'react-native';
import ItemList from '../components/ItemList';
// import FilterCategory from '../components/FilterCategory';
import Constants from 'expo-constants';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

category = '';
// const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`
// const URL = `https://newsapi.org/v2/top-headlines?country=jp&language=en&category=sports&apiKey=${Constants.manifest.extra.newsApiKey}`
const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=${category}&apiKey=${Constants.manifest.extra.newsApiKey}`


export default HomeScreen = ({navigation}) => {

  const [articles, setArticles] = useState([]);
  useEffect(() => {fetchArticles();}, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'ビジネス', value: 'business'},
    {label: 'エンターテイメント', value: 'entertainment'},
    {label: '一般', value: 'general'},
    {label: '健康', value: 'health'},
    {label: '科学', value: 'science'},
    {label: 'スポーツ', value: 'sports'},
    {label: 'テクノロジー', value: 'technology'}
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
      {/* <FilterCategory
      /> */}
      <Text>
        フィルタリングする項目を選んでください。
      </Text>
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value) => {
        category = value;
        const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=${category}&apiKey=${Constants.manifest.extra.newsApiKey}`
        const test = async () => {
          try {
            const response = await axios.get(URL);
            setArticles(response.data.articles)
          } catch (error) {
            console.error(error)
          }
      }
      test()
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