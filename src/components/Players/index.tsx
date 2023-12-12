import { Input } from "../Input";
import { Header } from "../Header";
import { Highlight } from "../Highlight";
import { ButtonIcon } from "../ButtonIcon";

import { Container, Form } from "./styles";
import { Filter } from "../Filter";


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