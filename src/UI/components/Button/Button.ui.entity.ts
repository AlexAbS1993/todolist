import { IButtonDTO, IButtonState } from "./Button.interface";

export class ButtonUI {
    text: string 
    active: boolean
    handler: Function
    classList: string[]
    state: null|IButtonState
    id: number
    constructor(data: IButtonDTO){
        this.text = data.text
        this.active = data.active
        this.handler = data.handler
        this.classList = []
        this.state = null,
        this.id = data.id
    }
    setClassList(list: string[]){
        this.classList = list
        return this
    }
    addToClassList(list: string|string[]): this{
        if (typeof list === 'string'){
            this.classList.push(list)
            return this
        }
        else if (Array.isArray(list)){
            this.classList = [...this.classList, ...list as string[]]
            return this
        }
        return this
    }
    deleteFromClassList(className: string){
        let newClassList = this.classList.filter((classNameInList) => classNameInList !== className)
        this.setClassList(newClassList)
        return this
    }
    setState(state: IButtonState){
        this.state = state
        return this
    }
    setUnactive(){
        this.addToClassList("deleteButton__unactive")
        this.active = false
        return this
    }
    setActive(){
        this.active = true
        return this
    }
}
