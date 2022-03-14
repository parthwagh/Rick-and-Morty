import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from './screens/intro';
import Characters from './screens/characters';
import CharacterDetails from './screens/characterDetails';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="intro" component={Intro}/>
        <Stack.Screen 
              name="characters" 
              component={Characters} 
              options= {{
                title: 'Characters',
                headerStyle: {
                  backgroundColor: "#282828",
                },
                headerTitleStyle : {
                  fontFamily: "Poppins-Regular",
                  color: "#f1f1f1",
                },
                headerTitleAlign: "center",
                headerTintColor: "#f1f1f1"
              }}
        />
        <Stack.Screen
          name= "Character Details"
          component={CharacterDetails}
          options= {{
                title: 'Character Details',
                headerStyle: {
                  backgroundColor: "#282828",
                },
                headerTitleStyle : {
                  fontFamily: "Poppins-Regular",
                  color: "#f1f1f1",
                },
                headerTitleAlign: "center",
                headerTintColor: "#f1f1f1"
              }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

