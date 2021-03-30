import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'native-base';
import Dashboard from '@/views/Dashboard';
import DashboardDetail from '@/views/OrderDetails';
import TechnicianSearch from '@/views/TechnicianSearch';

import { StackNavigatorOptions } from './_defaults';

import { updateOrders } from '@/store/order';

const DashboardStack = createStackNavigator();

const styles = StyleSheet.create({
  button: {
    paddingRight: 15,
  },
});

const DashboardPage = () => {
  const detailState = useSelector((state) => state.dashboardReducer);
  const userState = useSelector((state) => state.userReducer);

  const { role } = userState;
  const dashbaordTitle = {
    admin: 'Admin Dashboard',
    tenant: 'Dashboard',
    techincian: 'Technician Dashboard',
  }[role];


  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name={dashbaordTitle}
        component={Dashboard}
        options={StackNavigatorOptions}
      />
      <DashboardStack.Screen
        name='Technician Search'
        component={TechnicianSearch}
        options={StackNavigatorOptions}
      />
      <DashboardStack.Screen
        name="DashboardDetail"
        component={DashboardDetail}
        options={({ navigation }) => ({
          ...StackNavigatorOptions,
          title: `Building ${detailState.order.building}`,
          headerRight: () => (
            <Icon
              name="md-checkmark"
              size={25}
              style={styles.button}
              onPress={() => {
                updateOrders({
                  ...detailState.order,
                  complete: true
                })
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
