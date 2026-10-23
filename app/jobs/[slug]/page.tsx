import JobDetail from "@/components/job/job-detail";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div className="h-16" />}>
            <JobDetail />
        </Suspense>
    );
}