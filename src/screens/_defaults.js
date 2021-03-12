import { StyleSheet } from 'react-native';
import theme from 'theme';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.brandPrimary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
})

export const StackNavigatorOptions = {
  headerStyle: styles.headerStyle,
  headerTintColor: theme.textColor,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}