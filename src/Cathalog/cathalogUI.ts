import {UIUnstanceName} from './cathalog.instances.types'

class UICathalog{
    private instances: {[key in UIUnstanceName]?: any}
    constructor(){
        this.instances = {
            Buttons: {}
        }
    }
    addButton<InstanceType>(name: string, buttonInstance: InstanceType){
        this.instances.Buttons[name] = buttonInstance
        return this
    }
    add<InstanceType>(name: UIUnstanceName, instance:InstanceType){
        this.instances[name] =  instance
        return this
    }
    get<InstanceType>(name: UIUnstanceName):InstanceType{
        return this.instances[name]
    }
    delete(name: UIUnstanceName){
        delete this.instances[name]
        return this
    }
}

const cathalogUI = new UICathalog()

export default cathalogUI