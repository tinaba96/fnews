import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
 

const FilterCategory = () => {

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
  ])
  category = value;
        const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=${category}&apiKey=${Constants.manifest.extra.newsApiKey}`
        
        const test = async () => {
          try {
            const response = await axios.get(URL);
            setArticles(response.data.articles)
          } catch (error) {
            console.error(error)
          };

      return (
          <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
      );
}
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabel: {
    paddingRight: 16,
  },
  formControl: {
    height: 40,
    width: 250,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default FilterCategory