// Import necessary modules from React, React Native, and react-native-share
import React, { useState } from 'react';
import Share from 'react-native-share';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  // Define state variables for the grocery item and the list of grocery items
  const [item, setItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  // Function to add a new item to the grocery list
  const handleAddItem = () => {
    // Check if the item is not an empty string
    if (item.trim() !== '') {
      // Add the new item to the grocery list with a unique key based on the current timestamp
      setGroceryList([...groceryList, { key: String(Date.now()), name: item }]);
      // Clear the item input field
      setItem('');
    }
  };

  // Function to remove an item from the grocery list by its key
  const handleRemoveItem = (itemId) => {
    setGroceryList(groceryList.filter((item) => item.key !== itemId));
  };

  // Function to share the grocery list
  const onShare = async () => {
    const shareOptions = {
      title: 'Share Grocery List',
      message: 'Check out my grocery list!',
      url: 'https://www.mysimplegrocerylist.com',
    };

    try {
      await Share.open(shareOptions); // Open the share dialog
    } catch (error) {
      console.log('Error =>', error); // Log any errors
    }
  };

  // Render the app's UI
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Grocery List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter an item..."
          value={item}
          onChangeText={(text) => setItem(text)} // Update the item state when the input changes
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
  );
};

// Define the styles for the app's UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default App;
