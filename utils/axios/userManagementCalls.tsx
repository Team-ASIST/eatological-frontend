import { backend } from "./config";

// Calls without token
export const token = async (username: string) : Promise<string> => {
    try {
        const response = await backend.get(
            '/token',
            {
                headers: {
                    'user': username
                }
            }
        )

        if (response.status = 200) {
            // Extract token
            console.log(response.data)
            let token: string = response.data
            return token
        }
        console.error("Call Token aborted!")

    } catch (error) {
        console.error(error)
    }
    return ""
}

export const addUser = async (username: string) : Promise<boolean> => {
    try {
        const response = await backend.get(
            '/user/add',
            {
                headers: {
                    'user': username
                }
            }
        )

        if (response.status = 200) {
            return true
        }
        console.error("Call AddUser aborted!")

    } catch (error) {
        console.error(error)
    }
    return false
}

// Calls with token

export const renameUser = async (newName: string) : Promise<boolean> => {
    try {
        const response = await backend.get(
            '/user/rename',
            {
                headers: {
                    'user': newName
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

export const deleteUser = async () : Promise<boolean> => {
    try {
        const response = await backend.get(
            '/user/delete'
        )

        if (response.status = 200) {
            return true
        }
        console.error("Call DeleteUser aborted!")

    } catch (error) {
        console.error(error)
    }
    return false
}

// Currently only string Restrictions defined
export const getRestrictions = async () : Promise<string[]> => {
    try {
        const response = await backend.get(
            '/restrictions'
        )

        if (response.status = 200) {
            const restrictions : string[] = response.data
            return restrictions
        }
        console.error("Call RenameUser aborted!")

    } catch (error) {
        console.error(error)
    }
    return [] as string[]
}

// Currently only string Restrictions defined
export const setRestrictions = async (restriction: string) : Promise<boolean> => {
    try {
        const response = await backend.get(
            '/restrictions/set',
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


