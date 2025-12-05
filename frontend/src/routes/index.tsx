import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="flex-1 flex flex-col gap-6 p-6">
            <h3>Welcome Home!</h3>
        </div>
    );
}
