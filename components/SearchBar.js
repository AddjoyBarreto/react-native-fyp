
import React from 'react'
import { StyleSheet, StatusBar, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get('window');

export default withNavigation(class TopSearch extends React.Component {
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
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4E0C9' }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}>
            <EvilIcons name="navicon" size={40} color="black" />
          </TouchableOpacity>
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
              backgroundColor: '#F4E0C9',
              flex: 1
            }}
            inputContainerStyle={{ backgroundColor: '#F4E0C9', height: 35 }}
            inputStyle={{ color: 'black', marginLeft: 20 }}
            searchIcon={{ color: 'black' }}
            cancelIcon={{ color: 'black' }}

          />
        </View>
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
                  key={item.title}
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
                  }}>
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
})

const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    marginTop: StatusBar.currentHeight,
    width: width,
    overflow: 'visible',
    zIndex: 10,
    width: '100%'
  }
});