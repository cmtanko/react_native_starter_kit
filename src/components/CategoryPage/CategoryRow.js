import React from 'react';
import {Text, Icon, Left, Button, ListItem, Body} from 'native-base';

const CategoryRow = ({category, navigate}) => {
  const {id, title, icon} = category;
  return (
    <ListItem
      key={id}
      icon
      onPress={() => {
        navigate('CategoryAdd', {category});
      }}>
      <Left>
        <Button disabled info transparent>
          <Icon
            active
            type="FontAwesome"
            name={icon}
            style={{fontSize: 25, color: '#10cf9e'}}
          />
        </Button>
      </Left>
      <Body style={{borderWidth: 0}}>
        <Text style={{color: 'white'}}>{title}</Text>
      </Body>
    </ListItem>
  );
};

export default CategoryRow;
