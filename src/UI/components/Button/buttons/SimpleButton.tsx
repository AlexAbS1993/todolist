import { FC, useState, useMemo } from "react"
import { randomID } from "../../../../helpers/randomID"
import { ButtonPropsType, ButtonContainer } from "../Button.UI"
import { ButtonUI } from "../Button.ui.entity"


function simpleButtonCaller(handler:Function, text: string){
    const id = randomID()
    const simpleButton = new ButtonUI({
        id: id,
        text: text,
        active: true,
        handler: handler
    })
    simpleButton.addToClassList("simpleButton")
    return simpleButton
}

export const AddNewTaskButton:FC<ButtonPropsType> = ({handler}) => {
    const [buttonState, setButtonState] = useState<ButtonUI>()
    const [buttonChangeTrigger, setButtonChangeTrigger] = useState(true)
    const AddNewTaskCaller = useMemo(() => {
        return () => {
            return simpleButtonCaller(handler, "Добавить")
        }  
    }, [])
    const CurrentHandler = useMemo(() => {
        return () => {
            setButtonChangeTrigger((prev) => !prev)
            handler()
        }
    }, [])
    return (
        <ButtonContainer 
        handler={CurrentHandler}
        entityCaller={AddNewTaskCaller}
        buttonState={buttonState}
        setButtonState={setButtonState}
        buttonChangeTrigger={buttonChangeTrigger}
        />
    )
}