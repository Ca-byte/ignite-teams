import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup(){
	const navigation = useNavigation();
	const [group, setGroup] = useState('')

	function handleNewGroup(){
		navigation.navigate('players', { group })

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
				onChangeText={setGroup}
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