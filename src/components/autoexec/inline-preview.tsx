import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AutoexecFormValues } from '@/lib/schema';
import { generateAutoexecContent } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/retro-card';
import { Button } from '@/components/ui/button';
import { Copy, Maximize2, Minimize2 } from 'lucide-react';
import { toast } from 'react-toastify';

const InlinePreview: React.FC = () => {
  const { watch, getValues } = useFormContext<AutoexecFormValues>();
  const values = watch();

  const previewText = useMemo(() => {
    try {
      return generateAutoexecContent(getValues(), { includeTimestamp: false }).join('\n');
    } catch {
      return '// Preview unavailable due to invalid form values';
    }
  }, [values, getValues]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewText);
      toast.success('Preview copied to clipboard', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
      });
    } catch (err) {
      toast.error('Failed to copy preview', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mb-4 border border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
        <CardTitle className="text-[#E5E9F2] font-ui text-base sm:text-lg md:text-xl">
           Autoexec Preview
         </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(v => !v)} 
            className="flex items-center gap-1 transition-transform hover:scale-105 active:scale-95"
            aria-expanded={expanded}
            aria-controls="autoexec-preview"
            aria-label={expanded ? 'Collapse preview' : 'Expand preview'}
            title={expanded ? 'Collapse preview' : 'Expand preview'}
          >
            {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span>{expanded ? 'Collapse' : 'Unfold'}</span>
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            onClick={handleCopy} 
            className="flex items-center gap-1 transition-transform hover:scale-105 active:scale-95"
            aria-label="Copy preview to clipboard"
            title="Copy preview to clipboard"
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <figure aria-labelledby="preview-caption">
          <figcaption id="preview-caption" className="sr-only">Live preview of autoexec.cfg generated from current form settings</figcaption>
          <pre 
            id="autoexec-preview"
            aria-describedby="preview-caption"
            className={`font-ui text-sm bg-secondary/10 p-3 rounded-md whitespace-pre-wrap ${expanded ? 'max-h-none overflow-visible' : 'max-h-64 overflow-auto'}`}
          >
            <code aria-label="Autoexec preview with line numbers">
              {previewText.split('\n').map((line, idx) => (
                <div key={idx} className="flex">
                  <span aria-hidden="true" className="w-8 md:w-10 text-left pr-2 text-[#A0AA95] select-none">{idx + 1}</span>
                  <span className="whitespace-pre-wrap">{line.length ? line : ' '}</span>
                </div>
              ))}
            </code>
          </pre>
        </figure>
      </CardContent>
    </Card>
  );
};

export default InlinePreview;