import React, { memo, useState } from 'react';
import {
  StyleSheet, View, ScrollView, TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
import {
  Container, Text, Title, List, ListItem, Body, H3, Item, Input, Button, Icon,
} from 'native-base';
import ProgressiveImage from './ProgressiveImage';
import theme from '../native-base-theme/variables/commonColor';
import { callNumber } from '../utils';

const styles = StyleSheet.create({
  imageContainer: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.brandDisabled,
    width: '100%',
    marginBottom: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 400,
  },
  image: {
    // flex: 1,
    resizeMode: 'stretch',
  },
  bottomView: {
    // flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start', // vertical alignment
    alignItems: 'flex-start', // horizontal alignment
  },
});

// TODO: remove dummy data and hook up to firebase
const dummy = {
  user: {
    phone: {
      work: '+1 408 784-4917',
      afterhours: '+1 408 269-3856',
    },
  },
  log: [
    {
      date: '6/10 16:33',
      message: 'Coming back tomorrow with a bigger hammer.',
    },
  ],
};

const DashboardDetail = ({ route, navigation }) => {
  const {
    building,
    coordinates,
    description,
    problem,
    room,
    user,
    image,
  } = route.params;
  const [messages, setMessages] = useState(dummy.log);
  const [newMessage, setNewMessage] = useState('');
  return (
    <Container>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.imageContainer}>
            {image == null ? (
              <Title style={styles.text}>No image uploaded</Title>
            ) : (
              <ProgressiveImage source={{ uri: image }} style={styles.image} />
            )}
          </View>
          <List>
            <ListItem itemDivider><H3>Details:</H3></ListItem>
            <ListItem noIndent noBorder last>
              <Title>Room:</Title>
              <Body>
                <Text>
                  {` ${room} `}
                </Text>
              </Body>

            </ListItem>
            <ListItem noIndent noBorder last>
              <Title>Problem:</Title>
              <Body>
                <Text>
                  {` ${problem} `}
                </Text>
              </Body>
            </ListItem>
            <ListItem noIndent noBorder last>
              <Title>Description:</Title>
              <Body>
                <Text>
                  {` ${description} `}
                </Text>
              </Body>
            </ListItem>
            <ListItem itemDivider><H3>Contact:</H3></ListItem>
            <ListItem noIndent noBorder last>
              <Title>Name:</Title>
              <Body>
                <Text>John Doe</Text>
              </Body>
            </ListItem>
            <ListItem noIndent noBorder last>
              <Title>Work Hours:</Title>
              <Body>
                <TouchableOpacity onPress={() => callNumber(dummy.user.phone.work)}>
                  <Text selectable>{` ${dummy.user.phone.work}`}</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
            <ListItem noIndent noBorder last>
              <Title>After Hours:</Title>
              <Body>
                <TouchableOpacity onPress={() => callNumber(dummy.user.phone.afterhours)}>
                  <Text selectable>{` ${dummy.user.phone.afterhours}`}</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
            <ListItem itemDivider><H3>Technician Log:</H3></ListItem>
            {
            messages.map(({ date, message }) => (
              <ListItem noIndent noBorder last key={message}>
                <Title>{date}</Title>
                <Body>
                  <Text selectable>{message}</Text>
                </Body>
              </ListItem>
            ))
          }

            <ListItem noIndent noBorder last>
              <Item style>
                <Input placeholder="Message" onChangeText={setNewMessage} />
                <Button
                  success
                  onPress={() => {
                    setMessages([...messages, {
                      date: '7/10 12:40',
                      message: newMessage.valueOf(),
                    }]);
                  }}
                >
                  <Icon name="arrow-up-outline" />
                </Button>
              </Item>
            </ListItem>
          </List>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(DashboardDetail);
