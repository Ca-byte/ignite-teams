import { Header } from '@/components/Header';
import { Container }from './styles';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/GroupCard';

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight
      title='Team'
      subtitle='Play with your team'
      />
      <GroupCard 
      title='Fetchly Squad'
      />
    </Container>
  );
}


