import { useEffect, useState, useRef } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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
import { TextInput } from "react-native";
import { playerRemoveByGroup } from "@/storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@/storage/group/groupRemoveByName";

type RouteParams = {
	group: string;
}

export function Player(){
	const [team, setTeam]= useState('Team A')
	const [newPlayerName, setNewPlayerName]= useState('')
	const [players, setPlayers]= useState<PlayerStorageDTO[]>([])

	const route = useRoute()
	const navigation = useNavigation();

	const { group } = route.params as RouteParams;

	const newPlayerNameInputRef = useRef<TextInput>(null)

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
			newPlayerNameInputRef.current?.blur();
			fetchPlayersByTeam();
			setNewPlayerName('');
			
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

	async function handlePlayerRemove(playerName: string) {
		try {
			await playerRemoveByGroup(playerName, group);
			fetchPlayersByTeam();

		} catch (error) {
			console.log(error)
			Alert.alert('Remove person', 'It is not possible to delete this person')
			
		}
		
	}

	async function groupRemove(){
    try{
      await groupRemoveByName(group);
      navigation.navigate('groups');

    }catch{
      console.error();
      Alert.alert('Remove group', 'Unable to remove group.');
    }

  }
  
  async function handleGroupRemove() {
    Alert.alert(
      'remove',
      'Do you want to remove the group?',
      [
        { text: 'no', style: 'cancel'},
        { text: 'yes', onPress: () => groupRemove()}
      ]
    );
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
					inputRef={newPlayerNameInputRef}
					onChangeText={setNewPlayerName}
					placeholder="Team player name"
					autoCorrect={false}
					value={newPlayerName}
					onSubmitEditing={handleAddPlayer}
					returnKeyType="done"
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
					onRemove={()=> {handlePlayerRemove(item.name)}}
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
				onPress={handleGroupRemove}
			 />
		</Container>
	)
}