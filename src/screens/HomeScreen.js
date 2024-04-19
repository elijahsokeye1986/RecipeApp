import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Image, Vibration } from 'react-native';
import { Audio } from 'expo-av';

const HomeScreen = ({ navigation }) => {
    const initialRecipes = [
        {
            name: "Classic Tomato Spaghetti",
            key: '1',
            ingredients: ["Pasta", "Olive oil", "Tomatoes", "Garlic"],
            instructions: "Boil pasta. Sauté garlic and tomatoes in olive oil.",
            image: require('../../assets/spag.jpeg')
        },
        {
            name: "Chicken Curry",
            key: '2',
            ingredients: ["Chicken", "Curry powder", "Coconut milk", "Onions"],
            instructions: "Cook all ingredients until chicken is well done.",
            image: require('../../assets/chicken.curry.jpeg')
        },
        {
            name: "Beef Stroganoff",
            key: '3',
            ingredients: ["Beef", "Mushrooms", "Sour Cream", "Onions"],
            instructions: "Brown beef, add mushrooms and onions, and stir in sour cream.",
            image: require('../../assets/beef.jpeg')
        },
        {
            name: "Vegetable Stir Fry",
            key: '4',
            ingredients: ["Broccoli", "Carrots", "Peppers", "Soy Sauce"],
            instructions: "Stir fry all vegetables and add soy sauce.",
            image: require('../../assets/vegetable.jpeg')
        },
        {
            name: "Pumpkin Soup",
            key: '5',
            ingredients: ["Pumpkin", "Vegetable Stock", "Cream", "Onion"],
            instructions: "Cook all ingredients until soft, then blend until smooth.",
            image: require('../../assets/pumpkin.jpeg')
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        async function loadSound() {
            const { sound: loadedSound } = await Audio.Sound.createAsync(
                require('../../assets/thinking.mp3'),
                { shouldPlay: true }
            );
            setSound(loadedSound);
        }

        loadSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const formattedQuery = text.toLowerCase();
        const filteredData = initialRecipes.filter(item => {
            return item.name.toLowerCase().includes(formattedQuery);
        });
        setFilteredRecipes(filteredData);
    };

    const resetFilter = () => {
        setSearchQuery('');
        setFilteredRecipes(initialRecipes);
    };

    const handleRecipeSelect = (item) => {
        Vibration.vibrate(10); // Vibrate for 10 milliseconds
        navigation.navigate('RecipeDetail', { recipe: item });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeMessage}>Welcome to My Recipe App!</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Recipes..."
                value={searchQuery}
                onChangeText={handleSearch}
                clearButtonMode="always"
            />
            <Button
                title="Reset Filter"
                onPress={resetFilter}
                color="#4a148c"
            />
            <FlatList
                data={filteredRecipes}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleRecipeSelect(item)}
                    >
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.key}
            />
            <Button
                title="Add New Recipe"
                onPress={() => navigation.navigate('AddRecipe')}
                color="#4a148c"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    welcomeMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a148c',
        textAlign: 'center',
        marginVertical: 20,
    },
    searchBar: {
        fontSize: 18,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    item: {
        backgroundColor: '#f0e0ff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    }
});

export default HomeScreen;
