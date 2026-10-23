import BlogPage from "@/components/blog/blog-page";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense fallback={<div className="h-16" />}>
            <BlogPage />
        </Suspense>
    );
}