import React, {useState,useEffect, useCallback} from 'react'
import Home from './Home';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
    
    return (
      
      <SafeAreaView
      style={styles.safeAreaView}
      onLayout={onLayoutRootView}>
      <Home/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{
  flex: 1, }

});

