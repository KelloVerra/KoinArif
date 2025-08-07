// MATERIALS
const MATERIALS = [
    _ => { return { // material 1
        id:0,
        error: false,
        element: (<>
            <h1>Material 1</h1>
        </>),
        }
    },
    _ => { return { // material 2
        id:1,
        error: false,
        element: (<>
            <h1>Material 2</h1>
        </>),
        }
    }
]

// UNKNOWN MATERIAL
function m_unknown() {
    return {
        error: true,
        element: (<>
            <h1>Unknown Material, Go back</h1>
        </>)
    }
}


// GET
export function getMaterialByIndex(index) {
    // Gatekeep unknown materials
    if(index < 0 || index >= MATERIALS.length) return m_unknown()

    return MATERIALS.at(index)()
}