import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'native-base';
import Dashboard from '../components/Dashboard';
import DashboardAdmin from '../components/DashboardAdmin';
import DashboardDetail from '../components/DashboardDetail';
import theme from '../native-base-theme/variables/commonColor';

import { updateOrders } from '../actions';

const DashboardStack = createStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.brandPrimary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  button: {
    paddingRight: 15,
  },
});

const DashboardPage = () => {
  const detailState = useSelector((state) => state.detailReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { role } = userState;
  const key = detailState.order[0] === undefined ? '' : detailState.order[0];
  const value = detailState.order[1] === undefined ? {} : detailState.order[1];

  const DashboardStackOptions = {
    headerStyle: styles.headerStyle,
    headerTintColor: theme.textColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  return (
    <DashboardStack.Navigator>
      {role === 'admin' ? (
        <DashboardStack.Screen
          name="Dashboard Admin"
          component={DashboardAdmin}
          options={DashboardStackOptions}
        />
      ) : (
        <DashboardStack.Screen
          name="Dashboard"
          component={Dashboard}
          options={DashboardStackOptions}
        />
      )}

      <DashboardStack.Screen
        name="DashboardDetail"
        component={DashboardDetail}
        options={({ navigation }) => ({
          ...DashboardStackOptions,
          title: `Building ${value.building}`,
          headerRight: () => (
            <Icon
              name="md-checkmark"
              size={25}
              style={styles.button}
              onPress={() => {
                updateOrders(key)({ ...value, complete: true })(dispatch);
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardPage;
