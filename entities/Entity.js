export class Entity
{
    constructor()
    {
        this.components = new Map();
    }

    addComponent(component)
    {
        this.components.set(component.constructor.name, component);
    }

    getComponent(componentClass)
    {
        const component = this.components.get(componentClass.name);
        if (!component) console.error(`Component ${componentClass.name} not found`);
        return component;
    }
}