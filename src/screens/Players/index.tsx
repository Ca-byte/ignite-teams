import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Filter } from "@/components/Filter";
import { Button } from "@/components/Button";
import { ListEmpty } from "@/components/ListEmpty";
import { PlayerCard } from "@/components/PlayerCard";
import { Highlight } from "@/components/Highlight";
import { ButtonIcon } from "@/components/ButtonIcon";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { AppError } from "@/utils/AppError";
import { playerAddByGroup } from "@/storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@/storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@/storage/player/PlayerStorageDTO";

type RouteParams = {
	group: string;
}

export function Player(){
	const [team, setTeam]= useState('Team A')
	const [newPlayerName, setNewPlayerName]= useState('')
	const [players, setPlayers]= useState<PlayerStorageDTO[]>([])

	const route = useRoute()

	const { group } = route.params as RouteParams;

	async function handleAddPlayer() {

		if (newPlayerName.trim().length === 0){
			return Alert.alert('New Player', 'Add a name of the newbie')
		}

		const newPlayer = {
			name: newPlayerName,
			team,
		}

		try {
			await playerAddByGroup(newPlayer, group)
			
		} catch (error) {
			if (error instanceof AppError){
				Alert.alert('New person', error.message);
			} else {
				console.log(error);
				Alert.alert('New person', 'Not possible to add!')
			}
			
		}
		
	}

	async function fetchPlayersByTeam(){
		try {
			const playersByTeam = await playersGetByGroupAndTeam(group, team);

			setPlayers(playersByTeam);
			
		} catch (error) {
			console.log(error);
			Alert.alert('People', 'Not possible to load a list of team members!')

		}
	}

	useEffect(() => {
		fetchPlayersByTeam();
	},[team])

	return(
		<Container>
			<Header showBackButton/>

			<Highlight 
				title={group}
				subtitle="Add people and select the team members"
			/>
			<Form>

				<Input 
					onChangeText={setNewPlayerName}
					placeholder="Team player name"
					autoCorrect={false}
				/>

				<ButtonIcon
					icon="add"
					onPress={handleAddPlayer}
				/>
			</Form>

			<HeaderList>
				<FlatList 
					data={['Team A', 'Team B', 'Team C']}
					keyExtractor={item => item}
					renderItem={({ item })=> (
					
					<Filter 
						title={item}
						isActive={item === team}
						onPress={() => setTeam(item)}
					/>
				)}
				horizontal
				/>

				<NumberOfPlayers>
					{players.length}
				</NumberOfPlayers>
			</HeaderList>

			<FlatList 
				data={players}
				keyExtractor={item => item.name}
				renderItem={({item})=> (
					<PlayerCard 
					name={item.name}
					onRemove={()=> {}}
					/>
				)}
				ListEmptyComponent={() => (
					<ListEmpty message="Nobody yet! Why?" />
			)}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={[
				{ paddingBottom: 100 },
				players.length === 0 && { flex: 1 }
			]}
			/>
			<Button
			title="Delete team"
			type="SECONDARY"
			 />
		</Container>
	)
}