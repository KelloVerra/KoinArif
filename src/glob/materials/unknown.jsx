export default function unknown_material() {
    return {
        id: -1,
        error: true,
        component: _ => (
            <>
                <h1>Unknown Material, Go back</h1>
            </>
        )
    }
}