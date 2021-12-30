import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


const styles = StyleSheet.create({
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

const ItemList = ({title, image, author}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <Image
            style = {{ width : 100, height: 100}}
            source = {{uri: image }}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text numberOfLines = {3}>
              {title}
          </Text>
          <Text style={styles.subText}>{author}</Text>
        </View>
      </View>
    )
}

export default ItemList
