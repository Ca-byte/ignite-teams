import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@/storage/group/groupsgetAll';

import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/GroupCard';
import { ListEmpty } from '@/components/ListEmpty';

import { Container }from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading]= useState(true);

  const navigation = useNavigation();

  function handleNewGroup(){

    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      Alert.alert('Teams', 'It was not possible to load teams.')
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  }

  function handleOpeGroup(group: string ){
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(()=> {
    console.log('rodou')
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
      title='Team'
      subtitle='Play with your team'
      />
      {
        isLoading ? <Loading /> :
     
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
            onPress={() => handleOpeGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nice to see you here! let's create the first team?" />
        )}
      />
    }
      <Button title='Create new team' 
      onPress={handleNewGroup}
      />
    </Container>
  );
}


