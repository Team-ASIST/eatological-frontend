import { backend } from "./config";
import { Restriction } from "../dataTypes";

// Currently only string Restrictions defined
export const getRestrictions = async () : Promise<Restriction[]> => {
    try {
        const response = await backend().get(
            '/restrictions'
        )

        if (response.status = 200) {
            const names : string[] = response.data.restrictions
            const restrictions : Restriction[] = []
            for (const name of names ){
                restrictions.push({name: name, active: false})
            }
            restrictions.push({name: "None", active: false})


            return restrictions
        }
        console.error("Call RenameUser aborted!")

    } catch (error) {
        console.error(error)
    }
    return [] as Restriction[]
}

// Currently only string Restrictions defined
export const setRestrictions = async (restriction: string) : Promise<boolean> => {
    try {
        const response = await backend().post(
            '/restrictions/set',
            {},
            {
                headers: {
                    'restriction': restriction
                }
            }
        )

        if (response.status = 200) {
            return true
        }
        console.error("Call RenameUser aborted!")

    } catch (error) {
        console.error(error)
    }
    return false
}


