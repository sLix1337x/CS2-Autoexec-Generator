import React from 'react';
import { useFormContext } from 'react-hook-form';
// Accordion removed: Include Options should always be visible
import { AutoexecFormValues } from '@/lib/schema';
import { IncludeOptionsSection } from '@/components/autoexec/sections/include-options-section';

const AutoexecForm = () => {
  const { formState } = useFormContext<AutoexecFormValues>();
  
  return (
    <section aria-labelledby="include-options-heading" className="w-full">
      <header className="px-4 py-2" aria-labelledby="include-options-heading">
        <span id="include-options-heading" className="flex items-center gap-2">
          <span className="inline-block w-2 h-5 bg-[#6369D1] border border-[#6369D1]" aria-hidden="true"></span>
          <span className="font-ui text-base font-semibold">INCLUDE OPTIONS</span>
        </span>
      </header>
      <IncludeOptionsSection />
    </section>
  );
};

export default AutoexecForm;
