import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const AddRecipeScreen = ({ navigation }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = () => {
        // Assuming you have a method to add recipes to your store or backend
        console.log('Submitting Recipe:', recipeName, ingredients, instructions);
        alert('Recipe Added Successfully!');

        // Here you might call an API to save the recipe or update your app's state
        // For now, let's assume you navigate back to the home screen
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Recipe Name:</Text>
            <TextInput
                style={styles.input}
                value={recipeName}
                onChangeText={setRecipeName}
                placeholder="Enter Recipe Name"
            />

            <Text style={styles.label}>Ingredients:</Text>
            <TextInput
                style={styles.input}
                value={ingredients}
                onChangeText={setIngredients}
                placeholder="List Ingredients"
                multiline
            />

            <Text style={styles.label}>Instructions:</Text>
            <TextInput
                style={styles.input}
                value={instructions}
                onChangeText={setInstructions}
                placeholder="Cooking Instructions"
                multiline
            />

            <Button
                title="Add Recipe"
                onPress={handleSubmit}
                color="#4a148c"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#333',
        fontWeight: 'bold',
    }
});

export default AddRecipeScreen;
