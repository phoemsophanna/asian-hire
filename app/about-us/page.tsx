import AboutPage from "@/components/about/about-page";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense fallback={<div className="h-16" />}>
            <AboutPage />
        </Suspense>
    );
}