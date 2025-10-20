import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AutoexecFormValues } from '@/lib/schema';
import { generateAutoexecContent } from "@/lib/utils";
import { RetroButton } from '@/components/ui/retro-button';
import { Copy, Maximize2, Minimize2 } from 'lucide-react';
import { toast } from 'react-toastify';

const StandalonePreview: React.FC = () => {
  const { watch, getValues } = useFormContext<AutoexecFormValues>();
  const values = watch();
  const [expanded, setExpanded] = useState(false);

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

  return (
    <aside className="retro-preview-standalone" role="complementary" aria-labelledby="preview-title">
      <header id="PreviewWindowHeader" className="retro-preview-header">
        <h3 id="preview-title" className="text-lg font-ui">Autoexec Preview Window</h3>
        <nav className="flex items-center gap-2" role="group" aria-label="Preview controls">
          <RetroButton 
            type="button"
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(v => !v)} 
            className="flex items-center gap-1 transition-transform hover:scale-105 active:scale-95"
            aria-expanded={expanded}
            aria-controls="autoexec-preview-content"
            aria-label={expanded ? 'Collapse preview' : 'Expand preview'}
            title={expanded ? 'Collapse preview' : 'Expand preview'}
          >
            {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span>{expanded ? 'Collapse' : 'Expand'}</span>
          </RetroButton>
          <RetroButton 
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
          </RetroButton>
        </nav>
      </header>
      
      <main id="PreviewWindow" className="retro-preview-content">
        <div className="mb-3 text-sm text-white font-ui">
          Place this file in: ..\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg
        </div>
        <figure aria-labelledby="preview-caption">
          <figcaption id="preview-caption" className="sr-only">
            Live preview of autoexec.cfg generated from current form settings
          </figcaption>
          <pre 
            id="autoexec-preview-content"
            aria-describedby="preview-caption"
            className={`retro-preview-code whitespace-pre-wrap ${
              expanded ? 'expanded' : 'collapsed'
            }`}
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
      </main>
    </aside>
  );
};

export default StandalonePreview;