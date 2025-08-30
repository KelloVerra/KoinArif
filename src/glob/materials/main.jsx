import unknown_material from "./unknown"

import material0 from "./material0"
import material1 from "./material1";
import material2 from "./material2";


// MATERIALS REGISTRY
const MATERIALS_REGISTRY = [
    _ => { return material0() },
    _ => { return material1() },
    _ => { return material2() },
];


// GET
export function getMaterialByIndex(index) {
    // Gatekeep unknown materials
    if(!Object.keys(MATERIALS_REGISTRY).includes(`${index}`)) return unknown_material()

    return MATERIALS_REGISTRY.at(index)()
}
export function getMaterials() {
    return [...MATERIALS_REGISTRY];
}



// UTILS
export function reduceMaterialSubmoduleData(materialData) {
    const reducedSubmoduleData = {
        terms: [],
        facts: [],
    };

    reducedSubmoduleData.terms = materialData.submoduleData.reduce((acc, item,) => acc.concat({
        materialId: materialData.id,
        submoduleId: item.id,
        data: [...item.terms],
    }), []);
    reducedSubmoduleData.facts = materialData.submoduleData.reduce((acc, item,) => acc.concat({
        materialId: materialData.id,
        submoduleId: item.id,
        data: {...item.facts},
    }), []);
    
    return reducedSubmoduleData;
}