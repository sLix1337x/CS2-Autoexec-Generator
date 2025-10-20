import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/retro-accordion";
import { AutoexecFormValues } from '@/lib/schema';
import { IncludeOptionsSection } from '@/components/autoexec/sections/include-options-section';

const AutoexecForm = () => {
  const { formState } = useFormContext<AutoexecFormValues>();
  
  return (
    <Accordion 
      type="multiple" 
      className="w-full space-y-1" 
      defaultValue={['include-options']}
      aria-label="Configuration sections"
    >

      {/* Include Options */}
      <AccordionItem value="include-options" className="border-b border-border" aria-labelledby="include-options-heading">
        <AccordionTrigger className="px-4 hover:bg-accent/50">
          <span id="include-options-heading" className="flex items-center gap-2">
            <span className="inline-block w-2 h-5 bg-yellow-400/80 border border-border" aria-hidden="true"></span>
            <span className="font-ui text-base">INCLUDE OPTIONS</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 py-0" id="include-options-content" aria-labelledby="include-options-heading">
          <IncludeOptionsSection />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AutoexecForm;
