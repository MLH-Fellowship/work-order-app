import React, { memo, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, View, ScrollView, TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
import {
  Container, Text, Title, List, ListItem, Body, H3, Item, Input, Button, Icon, Right, Left
} from 'native-base';
import { connect } from 'react-redux';
import ProgressiveImage from '@/components/ProgressiveImage';
import R from 'ramda';
import theme from 'theme';
import { callNumber } from '@/utils';
import firebase from '@/api/firebase'

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    backgroundColor: theme.brandDisabled,
    width: '100%',
    marginBottom: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 400,
  },
  image: {
    resizeMode: 'stretch',
  },
  bottomView: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start', // vertical alignment
    alignItems: 'flex-start', // horizontal alignment
  },
});

const DashboardDetail = ({ userReducer, route: { params }, navigation }) => {
  const [order, updateOrder] = useState(params.order);
  const [orderSubmitter, updateOrderSubmitter] = useState({});
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const ref = firebase.database().ref(`/orders/${params.order.id}`);
    const onValue = ref.on('value', (snapshot) => {
      updateOrder(snapshot.val())
    })

    return () => ref.off('value', onValue);
  }, [params.order.id]);

  useEffect(() => {
    const ref = firebase.database().ref(`/users/${params.order.user}`);
    const onValue = ref.on('value', (snapshot) => {
      updateOrderSubmitter({
        // keep id associated to order
        id: params.order.id,
        ...snapshot.val()
      })
    })

    return () => ref.off('value', onValue);
  }, [params.order.id]);

  const addNewLogMessage =
    useCallback(
    async () => {
      await firebase.database().ref(`/orders/${params.order.id}/log`).push({
        date: firebase.database.ServerValue.TIMESTAMP,
        message: newMessage,
      })
      setNewMessage('')
    },
  [newMessage])

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.imageContainer}>
            {order.image == null ? (
              <Title style={styles.text}>No image uploaded</Title>
            ) : (
              <ProgressiveImage source={{ uri: order.image }} style={styles.image} />
            )}
          </View>
          <List>
            <ListItem noIndent noBorder last>
              <Left>
                <Title>Technician:</Title>
              </Left>
              {(order.technician ? <Body>
                <Text>{order.technician.name}</Text>
              </Body> : <Right>
                <Button style={{ borderRadius: '100%' }} success onPress={
                  () => navigation.push('Technician Search', { orderId: params.order.id })
                }>
                  <Icon name="add"></Icon>
                </Button>
              </Right>)}
            </ListItem>
            <ListItem itemDivider><H3>Details:</H3></ListItem>
            <ListItem noIndent noBorder last>
              <Title>Room:</Title>
              <Body>
                <Text>
                  {` ${order.room} `}
                </Text>
              </Body>

            </ListItem>
            <ListItem noIndent noBorder last>
              <Title>Problem:</Title>
              <Body>
                <Text>
                  {` ${order.problem} `}
                </Text>
              </Body>
            </ListItem>
            <ListItem noIndent noBorder last>
              <Title>Description:</Title>
              <Body>
                <Text>
                  {` ${order.description} `}
                </Text>
              </Body>
            </ListItem>
            <ListItem itemDivider><H3>Contact:</H3></ListItem>
            <ListItem noIndent noBorder last>
              <Title>Name:</Title>
              <Body>
                <Text>{orderSubmitter.name || '...'}</Text>
              </Body>
            </ListItem>
            {orderSubmitter.phoneNumber ? <ListItem noIndent noBorder last>
              <Title>Work Hours:</Title>
              <Body>
                <TouchableOpacity onPress={() => callNumber(orderSubmitter.phoneNumber)}>
                  <Text selectable>{` ${orderSubmitter.phoneNumber}`}</Text>
                </TouchableOpacity>
              </Body>
            </ListItem> : null}
            {orderSubmitter.altPhoneNumber ? <ListItem noIndent noBorder last>
              <Title>After Hours:</Title>
              <Body>
                <TouchableOpacity onPress={() => callNumber(orderSubmitter.phoneNumber)}>
                  <Text selectable>{` ${orderSubmitter.altPhoneNumber}`}</Text>
                </TouchableOpacity>
              </Body>
            </ListItem> : null}
            <ListItem itemDivider><H3>Technician Log:</H3></ListItem>
            { order.log ?
                Object.values(order.log).map(({ date, message }) => (
                  <ListItem noIndent noBorder last key={date}>
                    <Title>{new Date(date).toISOString().slice(0, 10)}</Title>
                    <Body>
                      <Text selectable>{message}</Text>
                    </Body>
                  </ListItem>
                )) : <ListItem noIndent noBorder last>
                    <Body>
                      <Text>No messages yet...</Text>
                    </Body>
                  </ListItem>
          }
          {userReducer.role === 'techincian' ?
            <ListItem noIndent noBorder last>
              <Item>
                  <Input placeholder="Message" value={newMessage} onChangeText={setNewMessage} />
                <Button
                  success
                  onPress={addNewLogMessage}
                >
                  <Icon name="arrow-up-outline" />
                </Button>
              </Item>
            </ListItem> : null
          }
          </List>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(connect(R.pick(['userReducer']))(DashboardDetail));
