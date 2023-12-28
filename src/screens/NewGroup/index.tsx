import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { groupCreate } from "@/storage/group/groupCreate";

import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";

import { Container, Content, Icon } from "./styles";

export function NewGroup(){
	const navigation = useNavigation();
	const [group, setGroup] = useState('')

	async function handleNewGroup(){
		try {
			await groupCreate(group);
			navigation.navigate('players', { group });

		}catch(error){
			console.log(error)
		}
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