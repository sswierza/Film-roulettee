// Film Roulette - Expo React Native (dark theme + red accent)
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const TMDB_API_KEY = 'REPLACE_WITH_YOUR_TMDB_API_KEY';
const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const STORAGE_KEY = '@film_roulette_mylist';
const COUNTRY = 'PL';

function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchMovies(q) {
    if (!q || q.trim().length === 0) return;
    setLoading(true);
    try {
      const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&language=pl-PL&query=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      Alert.alert('Błąd', 'Nie udało się wyszukać filmów.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Film Roulette</Text>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Wyszukaj film..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => searchMovies(query)}
          />
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => searchMovies(query)}>
            <Text style={styles.buttonPrimaryText}>Szukaj</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#E10600" />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Details', { movieId: item.id })}
              >
                {item.poster_path ? (
                  <Image source={{ uri: IMAGE_BASE + item.poster_path }} style={styles.poster} />
                ) : (
                  <View style={[styles.poster, styles.posterPlaceholder]}>
                    <Text style={{color:'#999'}}>Brak zdjęcia</Text>
                  </View>
                )}
                <View style={{ flex: 1, paddingLeft: 10 }}>
                  <Text style={styles.movieTitle}>{item.title} ({item.release_date ? item.release_date.slice(0,4) : '—'})</Text>
                  <Text numberOfLines={3} style={styles.movieOverview}>{item.overview}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('MyList')}>
            <Text style={styles.buttonSecondaryText}>Moja lista</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Draw')}>
            <Text style={styles.buttonPrimaryText}>Losuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// other screens omitted in this short example to keep file readable here (full version in ZIP)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Szukaj', headerStyle:{backgroundColor:'#000'}, headerTintColor:'#fff' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ACCENT = '#E10600';
const BG = '#000000';
const CARD = '#111111';
const TEXT = '#FFFFFF';
const MUTED = '#CCCCCC';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: BG },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: TEXT },
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#333', padding: 8, borderRadius: 6, color: TEXT, backgroundColor: '#0b0b0b' },
  card: { flexDirection: 'row', padding: 8, marginBottom: 8, borderWidth: 1, borderColor: '#222', borderRadius: 8, alignItems: 'center', backgroundColor: CARD },
  poster: { width: 80, height: 120, borderRadius: 6 },
  posterPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b0b0b' },
  movieTitle: { fontWeight: '700', color: TEXT },
  movieOverview: { color: MUTED },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  detailPoster: { width: 300, height: 450, alignSelf: 'center', borderRadius: 8, marginBottom: 12 },
  detailPosterSmall: { width: 150, height: 230, borderRadius: 8 },
  buttonPrimary: { backgroundColor: ACCENT, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  buttonPrimaryText: { color: TEXT, fontWeight: '700' },
  buttonSecondary: { backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginRight:8 },
  buttonSecondaryText: { color: MUTED }
});
