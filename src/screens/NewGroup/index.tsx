import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { groupCreate } from "@/storage/group/groupCreate";

import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";

import { Container, Content, Icon } from "./styles";
import { AppError } from "@/utils/AppError";
import { Alert } from "react-native";

export function NewGroup(){
	const navigation = useNavigation();
	const [group, setGroup] = useState('')

	async function handleNewGroup(){
		try {
			if(group.trim().length === 0){
				Alert.alert("New Group", "Inform the team name.");

			}
			await groupCreate(group);
			navigation.navigate('players', { group });

		}catch(error){
			if(error instanceof AppError){
				Alert.alert("New Group", error.message);
			}else
			Alert.alert("New Group", "Opss... It was not possible to create a new group!");
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