import React, {useState, useEffect, useRef} from 'react';
import {TextInput, StyleSheet, View, FlastList, FlatList, SafeAreaView, Text, RefreshControl} from 'react-native';
import ItemList from '../components/ItemList';
// import FilterCategory from '../components/FilterCategory';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

category = '';
// const URL = `https://newsapi.org/v2/everything?q=arsenal&apiKey=${Constants.manifest.extra.newsApiKey}`

const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=${category}&apiKey=${Constants.manifest.extra.newsApiKey}`


export default HomeScreen = ({navigation}) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pageRef = useRef(1)
  const fetchedAllRef = useRef(false)
  
  useEffect(() => {
    setLoading(true)
    fetchArticles();
    setLoading(false)
  }, []);

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

  const fetchArticles = async (page) => {
    try {
      const response = await axios.get(`${URL}&page=${page}`);
      if ( response.data.articles.length > 0){
      setArticles(prevArticles => [...prevArticles, ...response.data.articles]);
      } else {
        fetchedAllRef.current = true;
      }
    } catch (error) {
      console.error(error)
    }
  }


  const onEndReached = () => {
    if ( !fetchedAllRef.current){
      pageRef.current = pageRef.current + 1
      fetchArticles(pageRef.current)
    }
  }


  const onRefresh = async() => {
    setRefreshing(true)
    setArticles([])
    pageRef.current = 1
    fetchedAllRef.current = false
    await fetchArticles(1)
    setRefreshing(false)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <FilterCategory
      /> */}
      <Text style={[styles.filter]}>
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
        const filter = async (page) => {
          setLoading(true)
          try {
            const response = await axios.get(`${URL}&page=${page}`);
            setArticles(response.data.articles)
          } catch (error) {
            console.error(error)
          }
          setLoading(false)
      }
      filter()
      }}
    />
      {loading && <Loading />}
      <FlatList
        style={[styles.flat]}
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
        onEndReached = {onEndReached}
        refreshControl = {
          <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh }/>
        }
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
  filter: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  flat: {
    paddingTop: 10,
  }
});