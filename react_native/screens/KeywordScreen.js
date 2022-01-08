import React, {useState, useEffect, useRef} from 'react';
import {TextInput, StyleSheet, View, FlastList, FlatList, SafeAreaView, Text, RefreshControl, Button} from 'react-native';
import ItemList from '../components/ItemList';
// import FilterCategory from '../components/FilterCategory';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';

keyword = null
// const URL = `https://newsapi.org/v2/everything?q=コロナ&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`
const URL = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`


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


  const fetchArticles = async (page) => {
    const URL = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`
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

  const [text, onChangeText] = React.useState("");
  
  const search = () => {
    keyword = text
    const URL = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`
    pageRef.current = 1;
    const filter = async (page) => {
      setLoading(true)
      try {
        const response = await axios.get(`${URL}&page=1`);
        setArticles(response.data.articles)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
  }
    onRefresh()
    filter()
    onRefresh()
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.keywordText}>
      フィルタリングするキーワードを入力してください。
      </Text>
      <View  style = {styles.keyword }>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="ここに入力（言語不問）"
      />
      <View style = {styles.button }>
      <Button onPress = {search} size={40} title={'フィルタ'} />
      </View>
      </View>
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
  },
  keyword: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
      backgroundColor: "lightgray",
      shadowColor: "black",
      shadowOffset: {
        height: 2,
        width: 2 
      },
      shadowRadius: 2,
      shadowOpacity: 0.8,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 1,
      marginRight: 40,
      width: 130,
      justifyContent: 'center'
  },
  keywordText: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
  }
});