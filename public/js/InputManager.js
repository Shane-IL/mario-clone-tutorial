const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        //Stores the current state of a given key
        this.keyStates = new Map();
        //Maps callbacks to keycodes
        this.keyMap = new Map();
    }

    addMapping(keyCode, callback){
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event){
        const {keyCode} = event;
        if (!this.keyMap.has(keyCode)) {
            //key not mapped
            return;
        }

        event.preventDefault();

        const keyState =  event.type === 'keydown' ? PRESSED : RELEASED;

        if(this.keyStates.get(keyCode) === keyState){
            //key in same state
            return;
        }

        this.keyStates.set(keyCode, keyState);

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window){
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            })
        });
    }
}
