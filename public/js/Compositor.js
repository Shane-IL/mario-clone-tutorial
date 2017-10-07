export default class Compositor{
    constructor(){
        this.layers = [];
    }

    draw(context){
        this.layers.forEach(layer => layer(context));
    }
}

const CompositorFactory = (layers = []) => {
    return {
        draw: (context) => {
            layers.forEach(layer => layer(context));
        }
    }
}
