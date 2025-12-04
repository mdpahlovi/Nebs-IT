import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notice-board/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>RouteComponent</div>;
}
