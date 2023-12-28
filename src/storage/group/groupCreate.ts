import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsgetAll";
import { AppError } from "@/utils/AppError";

export async function groupCreate(newGroupName:string) {
	try {
		const storedGroups = await groupsGetAll();

		const groupAlreadyExists = storedGroups.includes(newGroupName)

		if (groupAlreadyExists){
			throw new AppError("Oh no :( There's already a group with this name! Please choose another!")
		}

		const storage = JSON.stringify([...storedGroups, newGroupName] )

		await AsyncStorage.setItem(GROUP_COLLECTION, storage)

	} catch (error) {
		throw error;
		
	}
}