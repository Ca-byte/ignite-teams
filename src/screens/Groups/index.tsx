import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@/components/Header';
import { Container }from './styles';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/GroupCard';
import { ListEmpty } from '@/components/ListEmpty';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  return (
    <Container>
      <Header />
      <Highlight
      title='Team'
      subtitle='Play with your team'
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nice to see you here! let's create the first team?" />
        )}
      />
    </Container>
  );
}


