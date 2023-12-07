import { Header } from "@/components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@/components/Highlight";
import { Button } from "@/components/Button";

export function NewGroup(){
	return(
		<Container>
			<Header showBackButton/>

			<Content>
				<Icon />

				<Highlight 
				title="New Team"
				subtitle="Add some good people"
				/>

				<Button
				title="Create"
				 />
				 
			</Content>
		</Container>
	)
}