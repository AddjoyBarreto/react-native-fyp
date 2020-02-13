
import React from 'react'
import { StyleSheet, StatusBar, View, Dimensions } from 'react-native'
import { SearchBar } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default class TopSearch extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.searchbar}>
        <SearchBar
          
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    width: width
  }
});