import * as hooks from "./appHooks";

export default class Component {
    static gimmieBanana() { 
        return hooks.hookBanana(); 
    }
    static gimmieApple() { 
        return hooks.hookApple(); 
    }
}

