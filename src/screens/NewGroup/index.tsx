import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";
import { Container, Content, Icon } from "./styles";

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
				<Input />

				<Button
				title="Create"
				style={{ marginTop: 20 }}
				 />
				 
			</Content>
		</Container>
	)
}