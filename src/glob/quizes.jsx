
// INIT
const QUIZES = {}

// UNKNOWN QUIZ
function q_unknown() {
    return {
        error: true,
        element: (<>
            <h1>Unknown Quiz, Go Back</h1>
        </>)
    }
}


// QUIZ MATERIAL 0
function q_m_0_0() {
    return {
        error: false,
        element: (<>
            <h1>Quiz Material 0 Variant 0</h1>
        </>)
    }
}
function q_m_0_1() {
    return {
        error: false,
        element: (<>
            <h1>Quiz Material 0 Variant 1</h1>
        </>)
    }
}
registerQuizes(
    q_m_0_0, 
    q_m_0_1
)


// GET
export function getQuizById(id) {
    // Gatekeep unknown materials
    if(!Object.keys(QUIZES).includes(id)) return q_unknown()

    return QUIZES[id]()
}

function registerQuizes(...func) {
    let i = 0
    func.forEach(v =>
        QUIZES[v.name] = v
    )
}