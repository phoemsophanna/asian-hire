import BlogDetail from "@/components/blog/blog-detail";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div className="h-16" />}>
            <BlogDetail />
        </Suspense>
    );
}