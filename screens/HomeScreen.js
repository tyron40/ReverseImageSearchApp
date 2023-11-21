import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import { AppStyles } from '../AppStyles';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Updated permission method

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    const selectedImageUri = pickerResult.assets[0]?.uri;

    // Resize the selected image
    const resizedImage = await ImageManipulator.manipulateAsync(
      selectedImageUri,
      [{ resize: { width: 300, height: 300 } }],
      { format: ImageManipulator.SaveFormat.JPEG }
    );

    setSelectedImage(resizedImage.uri);
  };

  const searchImage = () => {
    if (selectedImage) {
      navigation.navigate('SearchResults', { imageUri: selectedImage });
    }
  };

  return (
    <View style={AppStyles.container}>
      {selectedImage ? (
        <View style={AppStyles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={AppStyles.image} />
        </View>
      ) : (
        <Text style={AppStyles.customTextBold}>No image selected</Text>
      )}
      <TouchableOpacity onPress={openImagePicker}>
        <View style={AppStyles.button}>
          <Text style={AppStyles.buttonText}>Select Image</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={searchImage}>
        <View style={AppStyles.button}>
          <Text style={AppStyles.buttonText}>Search Image</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
