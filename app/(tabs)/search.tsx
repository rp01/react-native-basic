import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, View, Text, TextInput } from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('posts');
        if (savedPosts !== null) {
          setFilteredPosts(JSON.parse(savedPosts));
        }
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPosts = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('posts');
        if (savedPosts !== null) {
          const posts = JSON.parse(savedPosts);
          const filtered = posts.filter((post: { user: string; caption: string; }) =>
            post.user.toLowerCase().includes(query.toLowerCase()) ||
            post.caption.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredPosts(filtered);
        }
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    };

    filterPosts();
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by user or caption..."
        value={query}
        onChangeText={(value) => {
          setQuery(value)
        }}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
              <Text style={styles.user}>{item.user}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.caption}><Text style={styles.user}>{item.user}</Text> {item.caption}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 400,
  },
  caption: {
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

});
