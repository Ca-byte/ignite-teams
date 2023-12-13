import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { ButtonIcon } from "../../components/ButtonIcon";

import { Container, Form } from "./styles";
import { Filter } from "../../components/Filter";


export function Player(){
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
			
			<Filter 
				title="Team A"
			/>
		</Container>
	)
}