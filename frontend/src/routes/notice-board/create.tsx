import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notice-board/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello fgfg</div>;
}
