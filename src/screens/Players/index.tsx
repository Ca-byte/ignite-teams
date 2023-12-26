import { useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Filter } from "../../components/Filter";
import { Button } from "@/components/Button";
import { ListEmpty } from "@/components/ListEmpty";
import { PlayerCard } from "@/components/PlayerCard";
import { Highlight } from "../../components/Highlight";
import { ButtonIcon } from "../../components/ButtonIcon";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
type RouteParams = {
	group: string;
}

export function Player(){
	const [team, setTeam]= useState('Team A')
	const [players, setPlayers]= useState([])

	const route = useRoute()

	const { group } = route.params as RouteParams;

	return(
		<Container>
			<Header showBackButton/>

			<Highlight 
				title={group}
				subtitle="Add people and select the team members"
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