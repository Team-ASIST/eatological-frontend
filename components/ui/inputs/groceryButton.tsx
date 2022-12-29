import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../../utils/theme';
const Text = createText<Theme>();
const Box = createBox<Theme>();

export type GroceryButtonProps = {
    ingredientID: number,
    ingredientName: string,
    bought: number,
    required: number,
    onClick?: (arg0: number) => void,
}

const GroceryButton = ({ingredientID, ingredientName, bought, required, onClick}: GroceryButtonProps) => {
    return (
        <Box
            backgroundColor={"accent"}
            borderRadius={50}

        >

        </Box>
    )
}
export default GroceryButton;