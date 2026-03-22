import { motion } from "motion/react";

const contentBlocks = [
  {
    id: "unique",
    title: "What makes us unique?",
    text: "We are fully mission-driven.",
    color: "bg-hs-red",
    textColor: "text-hs-paper",
    colSpan: "col-span-12 md:col-span-8",
    rowSpan: "row-span-2",
  },
  {
    id: "media",
    title: "MEDIA FOCUS",
    text: "We plan to expand our social media presence through:\n\n• Ambassadors: from universities and education centres\n• High-quality content: focused on telling the stories of the hackers",
    color: "bg-hs-paper",
    textColor: "text-hs-ink",
    colSpan: "col-span-12 md:col-span-6",
    rowSpan: "row-span-3",
  },
  {
    id: "tracks",
    title: "ORIGINAL TRACKS",
    text: "• ML Track: ML challenges using free computing resources\n• Non-tech track: We'll teach non-technical people how to code high-quality software.",
    color: "bg-hs-teal",
    textColor: "text-hs-paper",
    colSpan: "col-span-12 md:col-span-6",
    rowSpan: "row-span-3",
  },
  {
    id: "img1",
    type: "image",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-6 md:col-span-4",
    rowSpan: "row-span-2",
  },
  {
    id: "sponsors",
    title: "Backed by the best",
    text: "Thanks to our sponsors, we'll be able to offer great prizes and a rewarding experience to the hackers.\n\nGoogle • K Fund • fal.ai • Exa • Mozart AI\n...and more are on the way!",
    color: "bg-hs-gold",
    textColor: "text-hs-ink",
    colSpan: "col-span-12 md:col-span-8",
    rowSpan: "row-span-2",
  },
  {
    id: "vision",
    title: "Our long-term vision",
    subtitle: "From Madrid to the World",
    text: "HackSpain isn't just a one-off event. It's the cornerstone of a movement that aims to position Spain as a European leader in young tech talent.\n\nEach edition will be bigger and more impactful. We aim to reach 5,000 participants next year, making it the largest hackathon in Europe.",
    color: "bg-hs-navy",
    textColor: "text-hs-paper",
    colSpan: "col-span-12",
    rowSpan: "row-span-3",
  },
  {
    id: "img2",
    type: "image",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-6 md:col-span-4",
    rowSpan: "row-span-2",
  },
];

export function ContentMosaic() {
  return (
    <section className="relative w-full bg-hs-ink px-2 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-2 md:gap-4 auto-rows-[minmax(100px,auto)]">
          {contentBlocks.map((block, i) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.4 }}
              className={`relative overflow-hidden border-[4px] border-hs-ink shadow-[6px_6px_0_var(--color-hs-ink)] ${block.colSpan} ${block.rowSpan} ${block.color || "bg-hs-sand"}`}
            >
              {block.type === "image" ? (
                <div className="group h-full w-full">
                  <div className="absolute inset-0 bg-hs-orange transition-transform duration-500 group-hover:-translate-y-full" />
                  <img
                    src={block.src}
                    alt=""
                    className="h-full w-full object-cover grayscale mix-blend-multiply opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100"
                  />
                </div>
              ) : (
                <div className={`flex h-full flex-col justify-center p-6 md:p-10 ${block.textColor}`}>
                  {block.title && (
                    <h2 className="mb-4 font-['Bungee'] text-2xl md:text-4xl leading-tight">
                      {block.title}
                    </h2>
                  )}
                  {block.subtitle && (
                    <h3 className="mb-4 font-['DM_Sans'] text-xl font-black tracking-tight md:text-2xl">
                      {block.subtitle}
                    </h3>
                  )}
                  {block.text && (
                    <div className="font-['DM_Sans'] text-sm font-medium leading-relaxed md:text-base whitespace-pre-wrap">
                      {block.text}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
