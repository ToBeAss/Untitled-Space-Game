export class Entity
{
    static typeCounters = {};
    constructor(entityType)
    {
        this.id = this.generateId(entityType);
        this.components = new Map();
    }

    static incrementCounter(entityType) {
        if (!this.typeCounters[entityType]) {
            this.typeCounters[entityType] = 0;
        }
        return ++this.typeCounters[entityType];
    }

    generateId(entityType)
    {
        const count = Entity.incrementCounter(entityType);
        return entityType + ":" + count;
    }

    addComponent(component)
    {
        this.components.set(component.constructor.name, component);
    }

    getComponent(componentClass)
    {
        return this.components.get(componentClass.name);
    }
}