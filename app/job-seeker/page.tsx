import JobSeeker from "@/components/job-seeker/job-seeker";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <JobSeeker />
        </Suspense>
    );
}