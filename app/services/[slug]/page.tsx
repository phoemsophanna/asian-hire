import ServiceDetail, {
  getServiceBySlug,
} from "@/components/service/ServiceDetail";
import { Suspense } from "react";
import { notFound } from "next/navigation";

async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <ServicePage params={params} />
    </Suspense>
  );
}