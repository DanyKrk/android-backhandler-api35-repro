import {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';

function App() {
  const [backCount, setBackCount] = useState(0);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        console.log('hardwareBackPress received');
        setBackCount(count => count + 1);
        return true;
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Android BackHandler reproduction</Text>
      <Text testID="listener-status" style={styles.status}>
        Listener ready
      </Text>
      <Text testID="back-count" style={styles.count}>
        Back count: {backCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  status: {
    color: '#007A33',
    fontSize: 18,
  },
  count: {
    fontSize: 24,
  },
});

export default App;
