import ServicePage from "@/components/service/service-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <ServicePage />
    </Suspense>
  );
}