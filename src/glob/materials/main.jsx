import unknown_quiz from "./unknown"

import material0 from "./material0"
import material1 from "./material1";


// MATERIALS REGISTRY
const MATERIALS_REGISTRY = [
    _ => { return material0 },
    _ => { return material1 },
];


// GET
export function getMaterialByIndex(index) {
    // Gatekeep unknown materials
    if(!Object.keys(MATERIALS_REGISTRY).includes(`${index}`)) return unknown_quiz()

    return MATERIALS_REGISTRY.at(index)()
}