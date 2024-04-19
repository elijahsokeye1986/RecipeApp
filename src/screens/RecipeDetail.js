import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recipes.db');

const RecipeDetail = ({ route }) => {
    const { recipe } = route.params;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Load comments from the database
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, recipeId INTEGER, text TEXT);',
                [],
                () => {
                    console.log('Table created successfully');
                    fetchComments();
                },
                (tx, error) => console.log('Error creating table: ', error)
            );
        });
    }, []);

    const fetchComments = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT text FROM comments WHERE recipeId = ?;',
                [recipe.key],
                (_, { rows }) => {
                    let fetchedComments = [];
                    for (let i = 0; i < rows.length; i++) {
                        fetchedComments.push(rows._array[i].text);
                    }
                    setComments(fetchedComments);
                },
                (tx, error) => console.log('Error retrieving comments: ', error)
            );
        });
    };

    const addComment = () => {
        if (comment) {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO comments (recipeId, text) VALUES (?, ?);',
                    [recipe.key, comment],
                    () => {
                        fetchComments();  // Refresh comments after adding
                        setComment('');  // Clear input after submission
                    },
                    (tx, error) => console.log('Error adding comment: ', error)
                );
            });
        }
    };

    return (
        <View style={styles.container}>
            <Image source={recipe.image} style={styles.image} />
            <Text style={styles.title}>{recipe.name}</Text>
            {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.detail}>{ingredient}</Text>
            ))}
            <Text style={styles.detail}>{recipe.instructions}</Text>
            <FlatList
                data={comments}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
            />
            <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
                onBlur={() => console.log("Input blurred")}
            />
            <Button title="Post Comment" onPress={addComment} color="#4a148c" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    comment: {
        fontSize: 16,
        color: '#333',
        padding: 5,
    },
});

export default RecipeDetail;
