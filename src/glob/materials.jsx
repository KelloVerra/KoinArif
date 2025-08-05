
// INIT
const MATERIALS = []

// UNKNOWN MATERIAL
function m_unknown() {
    return {
        error: true,
        element: (<>
            <h1>Unknown Material, Go back</h1>
        </>)
    }
}



// MATERIAL 0
function m_0() {
    return {
        error: false,
        element: (<>
            <h1>Material 1</h1>
        </>)
    }
}
MATERIALS.push(m_0)


// GET
export function getMaterialByIndex(index) {
    // Gatekeep unknown materials
    if(index < 0 || index >= MATERIALS.length) return m_unknown()

    return MATERIALS.at(index)()
}