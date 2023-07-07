import {InstancesName} from './cathalog.instances.types'

class Cathalog{
    private instances: {[key in InstancesName]?: any}
    constructor(){
        this.instances = {}
    }
    add<InstanceType>(name: InstancesName, instance:InstanceType){
        this.instances[name] =  instance
        return this
    }
    get<InstanceType>(name: InstancesName):InstanceType{
        return this.instances[name]
    }
    delete(name: InstancesName){
        delete this.instances[name]
        return this
    }
}

const cathalog = new Cathalog()

export default cathalog