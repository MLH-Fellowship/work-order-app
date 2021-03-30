import React, { useEffect, memo, useState, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Container, Header, Text, List, ListItem, Body, Item, Input, Icon, Left, Right, Button
} from 'native-base';
import { connect } from 'react-redux';
import R from 'ramda';
import { getTechnicians } from '@/api/user';
import { setOrderTechnician } from '@/api/order';
import {fbObjectToList} from '@/utils';

import debounce from 'lodash.debounce';


const styles = StyleSheet.create({
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

function useAsyncHook(searchQuery) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTechnicians() {
      try {
        setLoading(true);
        const response = await getTechnicians()
        setResult(fbObjectToList(response));
      } catch (error) {
        setLoading(null);
      }
    }
    fetchTechnicians()
  }, [searchQuery]);

  return [result, loading];
}


const TechnicianSearch = ({ navigation, route: { params: { orderId }}}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [result, loading] = useAsyncHook(searchQuery)

  const filteredTechnicians = (result, search) => {
    if (search.length === 0) {
      return result
    }
    search = search.toLowerCase();
    return result.filter(({name}) => name.toLowerCase().includes(search))
  }

  const debouncedSetDebouncedSearchQuery = useCallback(debounce(value => {
    setDebouncedSearchQuery(value)
  }, 1000))

  const onChangeSearch = (value) => {
    setSearchQuery(value)
    debouncedSetDebouncedSearchQuery(value)
  }

  return (
    <Container>
      <Header searchBar rounded style={{ borderColor: 'transparent' }}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" value={searchQuery} onChangeText={onChangeSearch} />
          <Icon name="ios-close" />
        </Item>
      </Header>
      <List>
        <FlatList
          style={{ height: '100%' }}
          data={filteredTechnicians(result, debouncedSearchQuery)}
          renderItem={({ item }) => (
            <ListItem><Left><Text>{item.name}</Text></Left><Right>
              <Button success onPress={() => {
                  setOrderTechnician(orderId, item)
                  navigation.goBack()
                }}><Icon name="add"></Icon></Button>
              </Right></ListItem>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<Text />}
          ListEmptyComponent={
            <ListItem last>
              <Body>
                <Text>{'No technicians found...'}</Text>
              </Body>
          </ListItem>
          }
        />
      </List>
    </Container>
  );
};

export default memo(connect(R.pick(['userReducer']))(TechnicianSearch));
