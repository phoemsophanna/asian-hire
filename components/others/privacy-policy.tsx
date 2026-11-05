import PageBanner from "../PageBanner";
import type { PrivacyPolicyPageContent } from "@/services/privacy-policy-service";

export default function PrivacyPolicyPage({ content }: { content: PrivacyPolicyPageContent }) {
  return (
    <>
      <PageBanner title="Privacy Policy" image={content.banner} />
      {content.content && (
        <section className="bg-[#f7f9fc] py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="h-1.5 bg-gradient-to-r from-[#485ea8] via-[#6b82c9] to-[#a3b5e6]" />
              <div
                className="privacy-content px-6 py-8 text-[15px] leading-8 text-slate-600 sm:px-10 sm:py-12 lg:px-14
                  [&_h1]:mb-8 [&_h1]:border-b [&_h1]:border-slate-200 [&_h1]:pb-6 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-slate-900 sm:[&_h1]:text-4xl
                  [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-900 sm:[&_h2]:text-2xl
                  [&_h2]:before:h-6 [&_h2]:before:w-1 [&_h2]:before:shrink-0 [&_h2]:before:rounded-full [&_h2]:before:bg-[#485ea8] [&_h2]:before:content-['']
                  [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900
                  [&_p]:mb-5 [&_p:last-child]:mb-0
                  [&_strong]:font-semibold [&_strong]:text-slate-900
                  [&_ul]:mb-6 [&_ul]:space-y-3 [&_ul]:rounded-2xl [&_ul]:bg-[#f7f9fc] [&_ul]:p-6
                  [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6
                  [&_li]:relative [&_li]:pl-6 [&_li>p]:mb-0
                  [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.7em] [&_ul>li]:before:h-2 [&_ul>li]:before:w-2 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[#485ea8] [&_ul>li]:before:content-['']
                  [&_a]:font-medium [&_a]:text-[#485ea8] [&_a]:underline [&_a]:decoration-[#485ea8]/30 [&_a]:underline-offset-4 [&_a]:transition hover:[&_a]:decoration-[#485ea8]"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
