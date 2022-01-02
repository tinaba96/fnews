import React, {useState, Component } from 'react';
import {StyleSheet, View, Text, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
 

export default class App extends Component {


  render() {

      return (
        <View style={styles.container}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            // setOpen={setOpen}
            // setValue={setValue}
            // setItems={setItems}
          />
            {/* <Text style={styles.formLabel}>フィルタ</Text>
            <TextInput
              style={styles.formControl}
              value=""
              placeholder="カテゴリを入力"
              onChangeText={t => this.setState({ category: t })}
            /> */}
          {/* <Text>{this.state.category}</Text> */}
        </View>
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