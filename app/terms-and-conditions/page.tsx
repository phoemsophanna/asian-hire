import Terms_Conditions_Page from "@/components/others/terms-and-conditions";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div className="h-16" />}>
            <Terms_Conditions_Page />
        </Suspense>
    );
}