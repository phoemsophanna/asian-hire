import Industry from "@/components/industry/industry";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <Industry />
        </Suspense>
    );
}