import { useNavigation } from "@react-navigation/native";
import { Container, Logo, BackButton, BackIcon,  } from "./styles";
import logoImg from '@/assets/logo.png'

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton }: Props) {

  const navigation = useNavigation();

  function handleGoBackHome(){
    navigation.navigate('groups')
  }
  return (
    <Container>
     { 
        showBackButton &&
        <BackButton onPress={handleGoBackHome}>
          <BackIcon />
        </BackButton>
      }

      <Logo source={logoImg} />
    </Container>
  )
}