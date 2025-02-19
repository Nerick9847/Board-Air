import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
   return (
      <section className="pb-[3rem] grid place-items-center">
         <h4 className="font-vanguard uppercase text-5xl lg:text-5xl lg:mb-[4rem] text-center">
            Frequently Asked Question
         </h4>
         <Accordion type="single" collapsible className="w-[50%] ">
            <AccordionItem value="item-1">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  Can I upload my own advertisement?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  Yes! Board Air allows users to upload their own images or videos for advertisement. 
                  The platform accepts common file formats such as .jpg, .png for images and .mp4 for videos.
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  Can I change or cancel my booking?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  No, you can not modify or cancel your booking. Please refer to our Terms and Conditions for specific 
                  cancellation policies and potential fees.
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  Are there any restrictions on the content I can advertise?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  Yes, all content must adhere to local laws and regulations. Advertisements that promote hate speech, violence, 
                  or illegal activities will not be allowed. Please ensure your content complies with Nepal Advertisement Guidelines.
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  Can I track the performance of my advertisement?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  Currently, our platform does not support real-time performance tracking. However, we are working on adding 
                  analytics features in the future to give advertisers insights on the reach and impact of their ads.
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
               <AccordionTrigger className="font-vanguard uppercase text-[1rem]">
                  How do I know if a digital billboard is available at my preferred time?{" "}
               </AccordionTrigger>
               <AccordionContent>
                  Our platform allows you to view available time slots for each billboard in real-time. Simply select your 
                  preferred location, and the calendar will show you the available times.
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </section>
   );
}
