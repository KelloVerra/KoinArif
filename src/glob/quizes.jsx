
// QUIZ MATERIAL 0
const QUIZES = {
    'q_m_0_0': _ =>{ return {
        error: false,
        element: (<>
            <h1>Quiz Material 0 Variant 0</h1>
        </>)
        }
    },
    'q_m_0_1': _ =>{ return {
        error: false,
        element: (<>
            <h1>Quiz Material 0 Variant 1</h1>
        </>)
        }
    }
}


// UNKNOWN QUIZ
function q_unknown() {
    return {
        error: true,
        element: (<>
            <h1>Unknown Quiz, Go Back</h1>
        </>)
    }
}


// GET
export function getQuizById(id) {
    // Gatekeep unknown materials
    if(!Object.keys(QUIZES).includes(id)) return q_unknown()

    return QUIZES[id]()
}