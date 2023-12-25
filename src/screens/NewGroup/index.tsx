import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function NewGroup(){
	const navigation = useNavigation();

	function handleNewGroup(){
		navigation.navigate('players', { group:'Fetchly'})

	}
	return(
		<Container>
			<Header showBackButton/>

			<Content>
				<Icon />

				<Highlight 
				title="New Team"
				subtitle="Add some good people"
				/>
				<Input 
				placeholder="Team name"
				/>

				<Button
				onPress={handleNewGroup}
				title="Create"
				style={{ marginTop: 20 }}
				 />
				 
			</Content>
		</Container>
	)
}