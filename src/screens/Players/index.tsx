import { useState } from "react";
import { FlatList } from "react-native";

import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Filter } from "../../components/Filter";
import { PlayerCard } from "@/components/PlayerCard";
import { Highlight } from "../../components/Highlight";
import { ButtonIcon } from "../../components/ButtonIcon";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";


export function Player(){
	const [team, setTeam]= useState('Team A')
	const [players, setPlayers]= useState([])

	return(
		<Container>
			<Header showBackButton/>

			<Highlight 
				title="Team Name"
				subtitle="Add people and select the team member"
			/>
			<Form>

				<Input 
					placeholder="Team player name"
					autoCorrect={false}
				/>

				<ButtonIcon
					icon="add"
				/>
			</Form>

			<HeaderList>
				<FlatList 
					data={['Team A', 'Team B']}
					keyExtractor={item => item}
					renderItem={({ item })=> (
					
					<Filter 
						title="Team A"
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
			keyExtractor={item => item}
			renderItem={({item})=> (
				<PlayerCard 
				name={item}
				onRemove={()=> {}}
				 />
			)}
			/>
		</Container>
	)
}