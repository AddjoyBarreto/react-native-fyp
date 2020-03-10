
import React from 'react'
import { StyleSheet, StatusBar, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default class TopSearch extends React.Component {
  state = {
    search: '',
    dropdownVisible: false
  };

  searchRef = React.createRef();

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.searchbar}>
        <SearchBar
          {...this.props.searcbar}
          ref={this.searchRef}
          onFocus={() => { this.setState({ dropdownVisible: true }) }}
          onBlur={() => { this.setState({ dropdownVisible: false }) }}
          placeholder="Search Station"
          placeholderTextColor='gray'
          onChangeText={this.updateSearch}
          value={search}
          platform='ios'
          lightTheme={false}
          containerStyle={{
            backgroundColor: '#F4E0C9'
          }}
          inputContainerStyle={{ backgroundColor: '#F4E0C9', height: 35 }}
          inputStyle={{ color: 'black', marginLeft: 30 }}
          searchIcon={{ color: 'black' }}
          cancelIcon={{ color: 'black' }}


        />
        {this.state.dropdownVisible ? (
          <View
            style={{
              padding: 10,
              paddingHorizontal: 0,
              paddingVertical: 0,
              backgroundColor: 'rgba(255,255,255,255.5)',
            }}>

            {this.props.markers.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.itemSelect(item);
                    this.searchRef.current.blur();
                    this.searchRef.current.clear();
                    this.setState({ dropdownVisible: !this.state.dropdownVisible })
                  }}>
                  <Text style={{
                    fontSize: 20,
                    paddingLeft: 60,
                    padding: 10,
                  }}
                    key={item.title}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )
            })}


          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    marginTop: StatusBar.currentHeight,
    width: width,
    overflow: 'visible',
    zIndex: 10
  }
});