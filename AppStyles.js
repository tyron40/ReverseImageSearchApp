import { StyleSheet } from 'react-native';

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white', // Background color for the entire screen
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#3498db', // Button background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  customText: {
    fontSize: 16,
    color: 'black',
  },
  customTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
