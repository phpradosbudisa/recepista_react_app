import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity, Linking, SafeAreaView, ScrollView } from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';



class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}></View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Image
              style={{ height: 100, width: 300 }}
              resizeMode="contain"
              source={{ uri: 'http://recepista.com/assets/img/1recepista.png' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
          <Text>
            Powered by
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('http://ladus.website')}>
            <Text style={{ color: 'blue' }}>
              ladus.website
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class AboutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ height: 200, width: 300 }}
          resizeMode="contain"
          source={{ uri: 'http://recepista.com/assets/img/us.png' }}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Text style={{ fontWeight: 'bold', letterSpacing: 2 }}>
            Our story:{"\n"}
          </Text>

          <Text style={{ textAlign: 'justify' }}>
            Our idea originated during a short break. We forgot our recipe book, and we like to cook very much. We had to look for recipes over the internet and come to the conclusion that our dough did not turn out well.
            {"\n"}{"\n"}Becouse of the situation where many of you have found yourselves as did we, we have created this app for food lovers. We want you to get involved in our story, hence the gourmet ingredients and the dish into your hands. Take a picture of the meals and send us your best recipes.
            {"\n"}{"\n"}
            Your contribution:{"\n"}{"\n"}
            * Spreading knowledge of cooking.{"\n"}
            * Discovering fantastic new recipes.{"\n"}
            * Creation and promotion of a creative culinary community.{"\n"}
            * Sharing knowledge.{"\n"}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>
              Powered by
          </Text>
            <TouchableOpacity onPress={() => Linking.openURL('http://ladus.website')}>
              <Text style={{ color: 'blue', paddingHorizontal: 4, fontWeight: 'bold', letterSpacing: 2 }}>
                Ladus
          </Text>
            </TouchableOpacity>
            <Text>&</Text>
            <TouchableOpacity onPress={() => Linking.openURL('http://recepista.com')}>
              <Text style={{ color: 'blue', paddingLeft: 4, fontWeight: 'bold', letterSpacing: 2 }}>
                Recepista
          </Text>
            </TouchableOpacity>
            <Text>.</Text>
          </View>
          </View>
          </View>
    );
  }
}



class RecipeScreen extends Component {
  state = {
    recipes: [],
    isLoading: true,
    search: ''
  }

  updateSearch = async search => {
    console.log(_.filter(recipes, { title: search}))
    this.setState({ search });
    console.log(search)
  };

  componentDidMount() {
    return fetch('http://recepista.com/api/api/post/read.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          recipes: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    const { search } = this.state;


    function toughnesCheck(toughnes) {
      switch (toughnes) {
        case "Lagano":
          return (
            <Text>
              ★☆☆☆
             </Text>
          )
          break;
        case "Normalno":
          return (
            <Text>
              ★★☆☆
             </Text>
          )
          break;
        case "Komplikovano":
          return (
            <Text>
              ★★★☆
             </Text>
          )
          break;
        case "Veoma zahtjevno":
          return (
            <Text>
              ★★★★
             </Text>
          )
          break;

        default:
          return (
            <Text>
              ☆☆☆☆☆
            </Text>
          )
          break;
      }
    }

    return (
      <View>
   
     <ScrollView
     scrollEnabled={true}>

<View style={{ width:null, height:100,paddingVertical: 10, paddingHorizontal: 15, border: null}}>
          <SearchBar
          style={{flex:1, width: null}}
          placeholder="Search recipes"
          lightTheme={true}
          onChangeText={this.updateSearch}
          value={search}
          showLoading={true}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 18
          }}
          containerStyle={{
            backgroundColor: null,
         }}
      />
      </View>
     
<Text style={{fontFamily: 'Courier New',paddingHorizontal: 10,color: '#707070', fontSize: 18, fontWeight: '200', paddingVertical: 10}}>FEATURED</Text>

<FlatList
  horizantal={true}
  style={{ height: 200, marginVertical: 15}}
  data={this.state.recipes}
  renderItem={({ item }) => (
    <View style={{flex:1}}>
      <TouchableOpacity
    activeOpacity={0.4}
    onPress={() => this.props.navigation.navigate('Details', { id: item.id })}
  >
    <View style={{
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      paddingVertical: 10, paddingHorizontal: 5
    }}>
      <View>
        <Image
          defaultSorce={{uri:"img/loader.gif"}}
          loadingIndicatorSource={{uri: "img/loader.gif"}}
          style={{ height: 160, width: null, borderRadius: 18 }}
          resizeMode="cover"
          progressiveRenderingEnabled={true}
          source={{ uri: item.img_url }}
        />
      </View>
      <View
        style={{ flex: 1, alignContent: 'space-between', flexDirection: 'row' }}>
        <Text
          style={{ flex: 1, fontSize: 17, fontWeight: '200', paddingVertical: 5 }}>
          {item.title}
        </Text>
        <Text
          style={{ letterSpacing: 6,textAlign: 'right',flex: 1, fontSize: 17, fontWeight: '200', paddingVertical: 5 }}>
          {toughnesCheck(item.toughnes)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
    </View>
  )}
  keyExtractor={({ id }, index) => id}
/>

<Text style={{fontFamily: 'Courier New', paddingHorizontal: 10,color: '#707070', fontSize: 18, fontWeight: '200', paddingVertical: 10}}>DAILY</Text>

      <View style={{flex:1, maxHeight: 500, marginVertical: 10}}>
          <FlatList
            numColumns={2}
            data={this.state.recipes}
            renderItem={({ item }) => (
              <View style={{flex:1}}>
                <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => this.props.navigation.navigate('Details', { id: item.id })}
            >
              <View style={{
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                paddingVertical: 10, paddingHorizontal: 5, overflow: 'scroll'
              }}>
                <View>
                  <Image
                    style={{ height: 190, width: null, borderRadius: 10 }}
                    resizeMode="cover"
                    source={{ uri: item.img_url }}
                  />
                </View>
                <View
                  style={{ alignContent: 'space-between' }}>
                  <Text
                    style={{ flex: 1, fontSize: 15, fontWeight: '200' }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{ flex: 1, fontSize: 15, fontWeight: '200' }}>
                    {toughnesCheck(item.toughnes)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ id }, index) => id}
          />
        </View>        
     </ScrollView>
      </View>
        );
  }
}

class DetailsScreen extends Component {
  state = {
    recipe: [],
    isLoading: true
  }

 

  componentWillMount() {
    const { params } = this.props.navigation.state;
    return fetch('http://recepista.com/api/api/post/read_single.php?id=' + params.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          recipe: responseJson,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    function star(toughnes) {
      switch (toughnes) {
        case "Lagano":
          return (
            <Text>
              ★☆☆☆
             </Text>
          )
          break;
        case "Normalno":
          return (
            <Text>
              ★★☆☆
             </Text>
          )
          break;
        case "Komplikovano":
          return (
            <Text>
              ★★★☆
             </Text>
          )
          break;
        case "Veoma zahtjevno":
          return (
            <Text>
              ★★★★
             </Text>
          )
          break;

        default:
          return (
            <Text>
              ☆☆☆☆☆
            </Text>
          )
          break;
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 10 }}>
          <ScrollView
            scrollEnabled={true}>
            <View style={{paddingHorizontal: 15, paddingVertical: 15 }}>
                <Image
                  style={{ height: 188, width: null, alignItems: 'center', borderRadius: 18 }}
                  resizeMode="cover"
                  source={{ uri: this.state.recipe.img_url }}
                />
              </View>
              
                  <Text style={{fontFamily: 'Courier New',fontSize: 17,color:'#707070', flex: 1, alignItems: "center", textAlign: "center" }}>
                    {this.state.recipe.title}
                  </Text>

                  <View style={{ backgroundColor: '#ff8b00', marginVertical: 10,paddingVertical: 15, borderRadius: 16, marginHorizontal: 15, flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Courier New',fontSize: 17, color:'white', flex: 1, alignItems: "center", textAlign: "center" }}>
                    {this.state.recipe.time} mins
                  </Text>
                  <Text style={{fontFamily: 'Courier New',borderWidth: 1, borderColor: 'white', borderBottomWidth: 0, borderTopWidth: 0,fontSize: 17,color:'white', flex: 1, alignItems: "center", textAlign: "center" }}>
                    {this.state.recipe.f_size} Persons
                  </Text>
                  <Text
                   style={{fontFamily: 'Courier New',fontSize: 17,color:'white', flex: 1, alignItems: "center", textAlign: "center" }}>
                    {this.state.recipe.category} 
                  </Text>
                  </View>

                  <View style={{ marginVertical: 10,paddingVertical: 5, flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Courier New', fontSize: 32,flex:1, alignItems: "center", textAlign: "center"}}>
                  {star(this.state.recipe.toughnes)}
                  </Text>
                  </View>

              
            <View style={{
              flexDirection: 'column',
              paddingVertical: 15, paddingHorizontal: 10
            }}>
              

              <Text 
              style={{fontFamily: 'Courier New',fontSize: 17,color:'#707070', flex: 1, alignItems: "center" }}>
              PREPARATION</Text>

              <View style={{marginHorizontal: 10,paddingVertical: 10, paddingHorizontal: 10, borderWidth:1, borderColor: '#e9e9e9', borderRadius: 10, marginVertical: 10}}>
              <Text
                style={{fontFamily: 'Courier New',fontSize: 17,color:'#707070', flex: 1, alignItems: "center", textAlign: "justify" }}>
                {this.state.recipe.description}
              </Text>
              </View>

              <Text
              style={{fontFamily: 'Courier New',fontSize: 17,color:'#707070', flex: 1, alignItems: "center" }}
              >INGREDIENTS</Text>


              <View style={{marginHorizontal: 10,paddingVertical: 10, paddingHorizontal: 10, borderWidth:1, borderColor: '#e9e9e9', borderRadius: 10, marginVertical: 10}}>
              <Text
                style={{fontFamily: 'Courier New',fontSize: 17,color:'#707070', flex: 1, alignItems: "center" }}>
                {this.state.recipe.ingredients}
              </Text>
              </View>   

            </View>
            <View style={{borderTop: 2, borderTopWidth: 2, borderColor: '#000', alignItems: 'center', justifyContent: 'center' ,flexDirection : 'row',flex: 1,width: null, paddingVertical: 10, paddingHorizontal: 15, justifyContent: "center" }}>
              <TouchableOpacity
              style={{flex:1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.props.navigation.navigate('Recipes')}
              >
                <Text style={{fontFamily: 'Courier New', textTransform: 'uppercase', color: '#000' }}> {"<"} Go back</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={{flex:1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => Linking.openURL('http://ladus.website')}
              >
                <Text style={{ fontFamily: 'Courier New',textTransform: 'capitalize', color: '#000' }}>powered by Ladus</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

      </View>

    )
  }
}

const AppTabNavigator = createBottomTabNavigator({
  Recipes: { screen: RecipeScreen },
  About: { screen: AboutScreen },
},{
  tabBarOptions: {
  backgroundColor: "#ff8b00",
  inactiveBackgroundColor: "#ff8b00",
  activeBackgroundColor: '#ff8b00',
  activeTintColor: 'white',
  inactiveTintColor: 'white',
  showIcon: true,
  labelStyle: {
    fontSize: 12,
  }},
  tabStyle: {
    backgroundColor: '#ff8b00'
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Home: { screen: AppTabNavigator },
  Details: { screen: DetailsScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    fontSize: 20,
    textTransform: 'uppercase'
  }
})