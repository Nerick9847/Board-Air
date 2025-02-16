import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
   return (
      <section className="pt-[2rem]  grid place-items-center">
         <h4 className="font-vanguard uppercase text-5xl lg:text-5xl lg:mb-[4rem] text-center">
            Frequently Asked Question
         </h4>
         <Accordion type="single" collapsible className="w-[50%] ">
            <AccordionItem value="item-1">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  What are your opening times?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  We are open Friday and Saturday, from 10:00pm to 5:00am, or on
                  Tuesdays from 10.30pm to 4:00am. Please see our events page
                  for further information on individual event times.
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  What is your dress code?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  We ask that you arrive smartly dressed to ensure entry. Jeans,
                  t-shirts and branded trainers are fine. We advise against
                  wearing tracksuits and caps. Shorts are allowed as long as
                  they are smart (no tracksuit style or sports shorts).
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  At what age can I visit Club Fahrenheit?
               </AccordionTrigger>
               <AccordionContent>
                  Admission to Fahrenheit is basically from 18 years. We do not
                  accept any transfer of responsibility for supervision. For
                  identification and as proof of age we only accept an official
                  ID: identity card, passport, driver's license. We cannot
                  accept these documents as proof: Student ID, health insurance
                  card, bank card/credit card, photos or scans of any
                  identification documents.
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  How do I reserve a VIP table and what are the prices?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  To book a VIP table, please access our calendar, select the
                  desired date and choose the table that best suits your
                  preferences. Prices are explicitly indicated, and for any
                  questions or customization requests, please do not hesitate to
                  contact us at <a href="">vip@opiumbarcelona.com</a>.
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  Can I book for a private event?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  If you are looking for the ideal setting to celebrate a big
                  birthday, a company event or the annual meeting of your group
                  of friends, you can book with us. We offer the perfect
                  combination of privacy, comfort and service. For more details,
                  write to <a href="">info@grupocostaeste.com</a>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </section>
   );
}
