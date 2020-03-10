
import React from 'react'
import { StyleSheet, StatusBar, View, Dimensions} from 'react-native'
import { SearchBar } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default class TopSearch extends React.Component {
  state = {
    search: ''
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
          platform='ios'
          lightTheme={false}
          containerStyle={{backgroundColor:'#F4E0C9'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    marginTop: StatusBar.currentHeight-5,
    width: width-50,
  },
});