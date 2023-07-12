import { FC, useEffect, useState } from 'react'
import classes from './Button.module.css'
import { ButtonUI } from './Button.ui.entity'
import cathalogUI from '../../../Cathalog/cathalogUI'
import { UIUnstanceName } from '../../../Cathalog/cathalog.instances.types'


type ButtonType = {
    classListString: string,
    text: string,
    handler: Function,
    active:boolean
}

export const Button:FC<ButtonType> = ({classListString, text, handler, active}) => {
    return (
        <div className={classes.button_container}>
            <button className={`${classes.button} ${classListString}`} 
            disabled={!active}
            onClick={() => {
                handler()
            }}
            >{text}</button>
        </div>
    )
}
type ContainerButtonType = {
    handler : Function
    entityCaller: Function
    buttonState: ButtonUI|undefined,
    setButtonState: React.Dispatch<React.SetStateAction<ButtonUI | undefined>>
    buttonChangeTrigger: boolean,
}

export const ButtonContainer:FC<ContainerButtonType> = ({handler, entityCaller, buttonState, setButtonState, buttonChangeTrigger}) => {
    const [isReady, setReady] = useState(false)
    useEffect(() => {
        const ButtonEntity = entityCaller()
        cathalogUI.addButton(`button${ButtonEntity.id}`, ButtonEntity)
        setButtonState(ButtonEntity)
        setReady(true)
        return () => {
            let buttons = cathalogUI.get(UIUnstanceName.Buttons) as {[key: string]: any}
            delete buttons[`button${ButtonEntity.id}`]
        }
    }, [])
    useEffect(() => {
        if(isReady){
            let buttons = cathalogUI.get(UIUnstanceName.Buttons) as {[key: string]: any}
            let currentButton:ButtonUI = buttons[`button${buttonState!.id}`]
            setButtonState(currentButton)
        }
    }, [buttonChangeTrigger])
    return (
        <>{
            isReady && <Button text={buttonState!.text} active={buttonState!.active} handler={() => {
                handler()
            }}
             classListString={buttonState!
                .classList.map((className) => {
                return classes[className]
             }).join(" ")}
             
             />
        }</>  
    )
}

export type ButtonPropsType = {
    handler: Function
}
