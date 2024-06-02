import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, View, TouchableOpacity, TextInput, Button, Image, Text, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function NewPostScrenn() {
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');

    const selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.canceled === true) {
            return;
        }

        setImage(pickerResult.assets[0].uri);
    };

    const savePost = async () => {
        if (!image || !caption) {
            Alert.alert('Error', 'Please select an image and enter a caption.');
            return;
        }

        const newPost = {
            id: Date.now().toString(),
            user: 'CurrentUser', // Replace with actual user data if available
            profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', // Replace with actual user profile pic if available
            image: image,
            caption,
            liked: false,
        };

        try {
            const savedPosts = await AsyncStorage.getItem('posts');
            const posts = savedPosts ? JSON.parse(savedPosts) : [];
            posts.push(newPost);
            await AsyncStorage.setItem('posts', JSON.stringify(posts));
            Alert.alert('Success', 'Post added successfully!');
            setImage('');
            setCaption('');
        } catch (error) {
            console.error('Failed to save post', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                    <Text style={styles.imagePickerText}>Select an Image</Text>
                )}
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Enter caption..."
                value={caption}
                onChangeText={setCaption}
            />
            <Button title="Post" onPress={savePost} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        borderRadius: 10,
    },
    imagePickerText: {
        color: '#aaa',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
});