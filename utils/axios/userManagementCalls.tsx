import { instance } from ".";
import { Restriction } from "../dataTypes";

// Currently only string Restrictions defined
export const getRestrictions = async (): Promise<Restriction[]> => {
    try {
        const response = await instance.get(
            '/restrictions'
        )

        const names: string[] = response.data.restrictions
        const restrictions: Restriction[] = []
        for (const name of names) {
            restrictions.push({ name: name, active: false })
        }
        restrictions.push({ name: "Keine", active: false })


        return restrictions

    } catch (error) {
        console.warn(error)
    }
    return [] as Restriction[]
}

// Currently only string Restrictions defined
export const setRestrictions = async (restriction: string): Promise<boolean> => {
    try {
        const response = await instance.post(
            '/restrictions/set',
            {},
            {
                headers: {
                    'restriction': restriction
                }
            }
        )

        return true
        console.warn("Call RenameUser aborted!")

    } catch (error) {
        console.warn(error)
    }
    return false
}


