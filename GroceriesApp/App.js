import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import * as Font from 'C:\Users\Samantha\Documents\GitHub\week-6-groceries-app-restful-services-ManthaPants\GroceriesApp\assets\fonts\NanumPenScript-Regular.ttf';
import Share from 'react-native-share'; // Import the react-native-share package


const App = () => {
  const [item, setItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);
  
  const loadFonts = async () => {
    await Font.loadAsync({
      'NanumPenScript-Regular': require('GroceriesApp\assets\fonts\NanumPenScript-Regular.ttf'),
    });
  };
  
  useEffect(() => {
    loadFonts();
  }, []);
  

  const handleAddItem = () => {
    if (item.trim() === '') {
      return;
    }

    const newItem = {
      key: Date.now().toString(),
      name: item,
    };

    setGroceryList([...groceryList, newItem]);
    setItem('');
  };

  const handleRemoveItem = (key) => {
    const updatedList = groceryList.filter(item => item.key !== key);
    setGroceryList(updatedList);
  };

  const onShare = async () => {
    try {
      const shareOptions = {
        title: 'Grocery List',
        message: groceryList.map(item => item.name).join('\n'),
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing the list:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Grocery List</Text>
      <View style={styles.groceryListContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter an item..."
            value={item}
            onChangeText={(text) => setItem(text)}
          />
          <Button title="Add" onPress={handleAddItem} />
        </View>
        <FlatList
          data={groceryList}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.name}</Text>
              <Button title="Remove" onPress={() => handleRemoveItem(item.key)} />
            </View>
          )}
        />
        <Button title="Share List" onPress={onShare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c9d7c0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groceryListContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 5,
  },
});

export default App;
