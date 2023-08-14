
import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Button } from '@rneui/themed';

// sdk
import { startPaymentFlow } from '@dojo-engineering/react-native-pay-sdk';
import { useSwitchContext } from './SwitchContext';


const pay = () => {
    startPaymentFlow({
      intentId: "pi_sandbox_KuT-pxdipU2FG8YBghMR6w",
    }).then((res) => {
      setResult(res);
    });
  };

const FirstPage = () => {
    const [userInput, setUserInput] = useState ('');
    const [gpayEnabledInput, setGpayState] = useState(false);

    const handleChange = (value) => {
      setUserInput(value);
    }

    function getGPayState() {
      return gpayEnabledInput
    }
  
    const handlePress = () => {
       //pay();
       Alert.alert ('You entered:', `${userInput}`);
    }

    const navigation = useNavigation();
    
    const { isEnabled } = useSwitchContext();


    return (
      <View style={styles.mainContainer}>
          <TextInput 
            style = {styles.input}
            onChangeText={handleChange} 
          />
          <Button 
            title="Submit" 
            color='green'
            onPress={handlePress}
          />
          {/* <Text>{gpayEnabledInput ? "GPay Enabled": "GPay Disabled" } </Text>  */}
          <Text>{isEnabled? "GPay Enabled": "GPay Disabled" } </Text> 


        <View style={styles.bottomContainer}>
          <Button 
            title="Settings"
            type='clear'
            color='gray'
            // onPress = {() => navigation.navigate('Settings', {gpayEnabled: getGPayState, onSelect: setGpayState})}
            onPress = {() => navigation.navigate('Settings')}

         />
        </View>

        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
  
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
    },
  
    input: {
      borderWidth:1,
      borderColor: 'gray', 
      margin:10, 
      width: 200,
    },
  });

export default FirstPage;