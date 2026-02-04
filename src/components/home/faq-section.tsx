import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "Are you insured against damage?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    question: "Can I trust you with my clothes?",
    answer:
      "Absolutely! We have been in business for over 10 years and have served thousands of satisfied customers. We treat every garment with the utmost care.",
  },
  {
    question: "How does the whole process work?",
    answer:
      "Simply schedule a pickup, we collect your laundry, clean it professionally, and deliver it back to you fresh and folded. It's that simple!",
  },
  {
    question: "How long does cleaning take?",
    answer:
      "Standard service takes 24-48 hours. We also offer express same-day service for urgent needs, with delivery in as little as 4 hours.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Questions
            </h2>
            <p className="text-muted-foreground mb-8">
              You can use our services in any convenient way – the choice is
              yours.
            </p>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0 bg-transparent"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-4 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Content - Images */}
          <div className="">
            <Image
              src={"/assets/popular-questions.png"}
              alt="Woman holding clean folded towels"
              className="w-full max-w-2xl h-auto object-contain rounded-xl"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
