import { FC, useMemo, useState } from "react"
import { randomID } from "../../../../helpers/randomID"
import { ButtonContainer, ButtonPropsType } from "../Button.UI"
import { ButtonUI } from "../Button.ui.entity"

function deleteButtonCaller(handler:Function){
    const id = randomID()
    let deleteButton = new ButtonUI({
        text: "Удалить",
        active: true,
        handler: handler,
        id: id
    })
    deleteButton.addToClassList("deleteButton")
    return deleteButton
}

export const DeleteButton:FC<ButtonPropsType> = ({handler}) => {
    const [buttonState, setButtonState] = useState<ButtonUI>()
    const [buttonChangeTrigger, setButtonChangeTrigger] = useState(true)
    const DeleteButtonCaller = useMemo(() => {
        return () => {
            return deleteButtonCaller(handler)
        }
    }, [])
    const CurrentHandler = useMemo(() => {
        return () => {
            buttonState?.setUnactive()
            setButtonChangeTrigger((prev) => !prev)
            handler()
        }
    }, [])
    return (
        <ButtonContainer 
        handler={CurrentHandler}
        entityCaller={DeleteButtonCaller}
        buttonState={buttonState}
        setButtonState={setButtonState}
        buttonChangeTrigger={buttonChangeTrigger}
        />
    )
}