import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetail from './src/screens/RecipeDetail';
import AddRecipeScreen from './src/screens/AddRecipeScreen'; // Make sure to import the AddRecipeScreen
import * as SplashScreen from 'expo-splash-screen';
const Stack = createStackNavigator();

const App = () => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 2000);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Recipe List',
                        headerStyle: { backgroundColor: '#4a148c' },
                        headerTitleStyle: { fontWeight: 'bold', color: '#fff' },
                        headerTintColor: '#fff'  // This sets the color of the back button
                    }}
                />
                <Stack.Screen
                    name="RecipeDetail"
                    component={RecipeDetail}
                    options={({ route }) => ({
                        title: route.params.recipe.name,
                        headerStyle: { backgroundColor: '#6a1b9a' },
                        headerTitleStyle: { fontWeight: 'bold', color: '#fff' },
                        headerTintColor: '#fff'
                    })}
                />
                <Stack.Screen
                    name="AddRecipe"
                    component={AddRecipeScreen}
                    options={{
                        title: 'Add New Recipe',
                        headerStyle: { backgroundColor: '#4a148c' },
                        headerTitleStyle: { fontWeight: 'bold', color: '#fff' },
                        headerTintColor: '#fff'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
