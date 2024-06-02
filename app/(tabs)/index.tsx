import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [posts, setPosts] = useState([
    { id: '1', user: 'User1', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', image: 'https://picsum.photos/400/400', caption: 'Cute kitten!', liked: false },
    { id: '2', user: 'User2', profilePic: 'https://randomuser.me/api/portraits/women/2.jpg', image: 'https://picsum.photos/400/401', caption: 'Another cute kitten!', liked: false },
    { id: '3', user: 'User3', profilePic: 'https://randomuser.me/api/portraits/men/3.jpg', image: 'https://picsum.photos/400/402', caption: 'Lovely day at the beach!', liked: false },
    { id: '4', user: 'User4', profilePic: 'https://randomuser.me/api/portraits/women/4.jpg', image: 'https://picsum.photos/400/403', caption: 'Amazing sunset!', liked: false },
    { id: '5', user: 'User5', profilePic: 'https://randomuser.me/api/portraits/men/5.jpg', image: 'https://picsum.photos/400/404', caption: 'Delicious food!', liked: false },
    // { id: '6', user: 'User6', profilePic: 'https://randomuser.me/api/portraits/women/6.jpg', image: 'https://picsum.photos/400/405', caption: 'Great hike in the mountains!', liked: false },
    // { id: '7', user: 'User7', profilePic: 'https://randomuser.me/api/portraits/men/7.jpg', image: 'https://picsum.photos/400/406', caption: 'City lights at night!', liked: false },
    // { id: '8', user: 'User8', profilePic: 'https://randomuser.me/api/portraits/women/8.jpg', image: 'https://picsum.photos/400/407', caption: 'Lovely flowers in bloom!', liked: false },
    // { id: '9', user: 'User9', profilePic: 'https://randomuser.me/api/portraits/men/9.jpg', image: 'https://picsum.photos/400/408', caption: 'Fun day with friends!', liked: false },
    // { id: '10', user: 'User10', profilePic: 'https://randomuser.me/api/portraits/women/10.jpg', image: 'https://picsum.photos/400/409', caption: 'Exploring new places!', liked: false },
    // { id: '11', user: 'User11', profilePic: 'https://randomuser.me/api/portraits/men/11.jpg', image: 'https://picsum.photos/400/410', caption: 'Quiet afternoon with a book!', liked: false },
    // { id: '12', user: 'User12', profilePic: 'https://randomuser.me/api/portraits/women/12.jpg', image: 'https://picsum.photos/400/411', caption: 'Beautiful architecture!', liked: false },
    // { id: '13', user: 'User13', profilePic: 'https://randomuser.me/api/portraits/men/13.jpg', image: 'https://picsum.photos/400/412', caption: 'Adorable puppies!', liked: false },
    // { id: '14', user: 'User14', profilePic: 'https://randomuser.me/api/portraits/women/14.jpg', image: 'https://picsum.photos/400/413', caption: 'Peaceful nature walk!', liked: false },
    // { id: '15', user: 'User15', profilePic: 'https://randomuser.me/api/portraits/men/15.jpg', image: 'https://picsum.photos/400/414', caption: 'Stunning landscape!', liked: false },
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, liked: !post.liked } : post
    ));
  };
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('posts');
        if (savedPosts !== null) {
          setPosts(JSON.parse(savedPosts));
        }
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    };

    loadPosts();
  }, [])

  useEffect(() => {
    const savePosts = async () => {
      try {
        await AsyncStorage.setItem('posts', JSON.stringify(posts));
      } catch (error) {
        console.error('Failed to save posts', error);
      }
    };

    savePosts();
  }, [posts]);

  // useEffect(() => {
  //   axios.get('https://reqres.in/api/posts')
  //     .then(response => setPosts(response.data.data)) // Adjust to the correct response structure
  //     .catch(error => console.error(error));
  // }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
              <Text style={styles.user}>{item.user}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Ionicons name={item.liked ? 'heart' : 'heart-outline'} size={30} color={item.liked ? 'red' : 'black'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={30} color="black" style={styles.commentIcon} />

              </TouchableOpacity>
            </View>
            <Text style={styles.caption}><Text style={styles.user}>{item.user}</Text> {item.caption}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  user: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
  },
  commentIcon: {
    marginLeft: 15,
  },
  caption: {
    padding: 10,
  },
});
