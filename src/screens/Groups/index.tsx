import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@/components/Header';
import { Container }from './styles';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/GroupCard';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Fetchly Squad']);
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
      />
    </Container>
  );
}


