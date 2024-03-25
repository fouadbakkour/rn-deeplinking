import * as React from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

/**
 * Stack Navigator Screens Props
 */
type RootStackParamList = {
  Home: undefined;
  Details: {id: number};
};

/**
 * Stack Navigator
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Data
 */
const groceryItems = [
  {id: 1, name: 'Apples'},
  {id: 2, name: 'Bananas'},
  {id: 3, name: 'Oranges'},
  {id: 4, name: 'Milk'},
  {id: 5, name: 'Bread'},
];

/**
 * Screens
 */
const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <View style={styles.container}>
      <Text>Grocery List</Text>
      <FlatList
        style={styles.list}
        data={groceryItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{padding: 10, borderBottomWidth: 1}}
            onPress={() => navigation.navigate('Details', {id: item.id})}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const DetailsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Details'>) => {
  const {id} = route.params;
  // eslint-disable-next-line eqeqeq
  const item = groceryItems.find(object => object.id == id);
  return (
    <View style={styles.container}>
      <Text>Item: {item ? item.name : 'Not Found'}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  },
  button: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

/**
 * Linking Configuration xcrun simctl openurl booted "mycoolapp://home"
 * TEST: xcrun simctl openurl booted "mycoolapp://details/1"
 * TEST: xcrun simctl openurl booted "mycoolapp://home"
 */
const linking = {
  // Prefixes accepted by the navigation container, should match the added schemes
  prefixes: ['mycoolapp://'],
  // Route config to map uri paths to screens
  config: {
    // Initial route name to be added to the stack before any further navigation,
    // should match one of the available screens
    initialRouteName: 'Home' as const,
    screens: {
      // mycoolapp://home -> HomeScreen
      Home: 'home',
      // mycoolapp://details/1 -> DetailsScreen with param id: 1
      Details: 'details/:id',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
