import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from './features/movies/movieSlice';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const StyledButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={{ ...styles.buttonText, ...props.style }}>
            {props.children}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const SocialLinks = () => {
  let social = [
    { id: 1, text: 'LinkedIn', icon: 'linkedin-square' },
    { id: 2, text: 'Facebook', icon: 'facebook-square' },
    { id: 3, text: 'Instagram', icon: 'instagram' },
    { id: 4, text: 'Website', icon: 'laptop' }
  ];

  return social.map((link) => (
    <View
      key={link.id}
      style={{
        flexDirection: 'row',
        padding: 10
      }}
    >
      <StyledButton
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <AntDesign name={link.icon} color="#000" size={18} />
        <Text
          style={{
            color: '#000',
            paddingLeft: 10,
            fontSize: 16
          }}
        >
          {' '}
          {link.text}
        </Text>
      </StyledButton>
    </View>
  ));
};

function App() {
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();
  const screenState = useSelector((state) => state.movies);
  let movieData = screenState.movies;
  console.log('🚀 ~ file: App.tsx ~ line 23 ~ App ~ movie', movieData);

  let bio =
    'Spending twenty-three years journeying through the universe, Captain Marvel learned of the Snap through the distress call sent out by Fury and had joined the Avengers in an attempt to confront Thanos and reverse the damage done, managing to also rescue Tony Stark and Nebula from deep space along the way.';

  let imageUrl = movieData?.image;
  const fetchData = () => {
    setStatus('loading');
    dispatch(fetchMovies());
    setStatus('success');
  };
  useEffect(() => {
    let mount = true;
    if (mount) {
      fetchData();
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {status === 'loading' && <ActivityIndicator color="#000" />}
      {status === 'success' && (
        <>
          <Image
            style={styles.backgroundImage}
            source={{ uri: `${imageUrl}` }}
          />
          <View style={styles.backgroundView}></View>

          <View style={styles.textContainerView}>
            <View style={{ flex: 2 }}>
              <Image
                style={styles.profilePicture}
                source={{ uri: `${imageUrl}` }}
              />
              <View
                style={{
                  flex: 1
                  // flexDirection: 'row'
                  // flexWrap: 'wrap',
                  // alignItems: 'center',
                  // justifyContent: 'stretch'
                }}
              >
                <SocialLinks />
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text
                style={{ color: '#DC0F0E', fontSize: 20, paddingBottom: 10 }}
              >
                {movieData?.title}
              </Text>
              <View style={styles.tagView}>
                <AntDesign name="tags" size={18} color="#888" />
                <Text style={{ paddingLeft: 2, fontSize: 14, color: '#888' }}>
                  {movieData?.id}
                </Text>
              </View>
              <Text>{bio}</Text>
              <View style={{ paddingTop: 20 }}>
                <StyledButton
                  style={{
                    backgroundColor: '#DC0F0E'
                  }}
                >
                  <Text style={{ fontSize: 14 }}>Follow Captain Marvel</Text>
                </StyledButton>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  backgroundImage: {
    flex: 2,
    resizeMode: 'cover',
    position: 'absolute',
    top: 40,
    width: width,
    height: 600
  },
  backgroundView: {
    backgroundColor: '#fafafa',
    flex: 1,
    position: 'absolute',
    top: 300,
    width: width,
    height: 400
  },
  textContainerView: {
    flexDirection: 'row',
    paddingTop: 350,
    paddingHorizontal: 10,
    flex: 1
  },
  profilePicture: {
    resizeMode: 'cover',
    width: 180,
    height: 240,
    borderRadius: 40
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingBottom: 15
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 180
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 8
  }
});
