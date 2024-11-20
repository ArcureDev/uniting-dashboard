import {createLazyFileRoute} from '@tanstack/react-router'
import Theme from "../components/theme.tsx";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <Theme>
            <div className="p-2">
                <h3>Welcome Home!</h3>
            </div>
        </Theme>
    )
}