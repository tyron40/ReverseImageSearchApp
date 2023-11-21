import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { AppStyles } from '../AppStyles';
import axios from 'axios';
import HTMLView from 'react-native-render-html';

const SearchResultsScreen = ({ route }) => {
  const { imageUri } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `https://images.google.com/search?engine=google_reverse_image&imageUri=${imageUri}`
      );

      // Extract relevant information from the HTML response here if needed

      // For demonstration purposes, we'll display the entire HTML response
      setSearchResults([response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.customTextBold}>Search Results</Text>
      <Image source={{ uri: imageUri }} style={AppStyles.image} />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={AppStyles.resultItem}>
              <HTMLView source={{ html: item }} />
            </View>
          )}
        />
      ) : (
        <Text>No search results found.</Text>
      )}
    </View>
  );
};

export default SearchResultsScreen;
