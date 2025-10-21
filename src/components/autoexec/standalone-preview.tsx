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
  // New: toggle echo visibility in preview (default hidden)
  const [showEcho, setShowEcho] = useState(false);

  const previewText = useMemo(() => {
    try {
      return generateAutoexecContent(getValues(), { includeTimestamp: false }).join('\n');
    } catch {
      return '// Preview unavailable due to invalid form values';
    }
  }, [values, getValues]);

  // Map selected consoleColor to a CSS hex for preview coloring
  const consoleColorHex = useMemo(() => {
    const col = watch('consoleColor');
    return col === 'pink' ? '#FF69B4'
      : col === 'lightblue' ? '#87CEEB'
      : col === 'orange' ? '#FFA500'
      : col === 'yellow' ? '#FFFF00'
      : col === 'green' ? '#00FF00'
      : col === 'red' ? '#FF0000'
      : '#FF69B4';
  }, [values?.consoleColor]);

  // Render a single preview line with colored value, comments, and echo
  const renderColoredLine = (line: string) => {
    const trimmed = line.trimStart();

    // Entire comment lines are light grey
    if (trimmed.startsWith('//')) {
      return <span className="whitespace-pre-wrap text-[#A0AA95]">{line.length ? line : ' '}</span>;
    }

    // Echo lines should be red
    if (trimmed.startsWith('echo')) {
      return <span className="whitespace-pre-wrap" style={{ color: '#FF0000' }}>{line.length ? line : ' '}</span>;
    }

    // Split inline comment part if present
    const commentIndex = line.indexOf('//');
    const prefix = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
    const comment = commentIndex >= 0 ? line.slice(commentIndex) : '';

    // Find quoted value including trailing semicolon (e.g., "FF25FFFF"; or ".022";)
    const match = prefix.match(/"[^"]*";/);
    if (!match) {
      // No quoted value: just render, with inline comment grey if present
      return (
        <span className="whitespace-pre-wrap">
          <span className="whitespace-pre-wrap">{prefix}</span>
          {comment && <span className="whitespace-pre-wrap text-[#A0AA95]">{comment}</span>}
        </span>
      );
    }

    const valStart = prefix.indexOf(match[0]);
    const before = prefix.slice(0, valStart);
    const valueToken = match[0];
    const after = prefix.slice(valStart + valueToken.length);

    return (
      <span className="whitespace-pre-wrap">
        <span className="whitespace-pre-wrap">{before}</span>
        <span className="whitespace-pre-wrap" style={{ color: consoleColorHex }}>{valueToken}</span>
        <span className="whitespace-pre-wrap">{after}</span>
        {comment && <span className="whitespace-pre-wrap text-[#A0AA95]">{comment}</span>}
      </span>
    );
  };

  // Filter lines based on echo visibility
  const linesForDisplay = useMemo(() => {
    const lines = previewText.split('\n');
    if (showEcho) return lines;
    return lines.filter((line) => !line.trimStart().startsWith('echo'));
  }, [previewText, showEcho]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linesForDisplay.join('\n'));
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
        <div id="preview-title" className="flex items-center gap-2">
             <span className="inline-block w-2 h-5 bg-[#6369D1] border border-[#6369D1]" aria-hidden="true"></span>
             <span className="text-white font-semibold font-ui text-sm">AUTOEXEC PREVIEW</span>
           </div>
        <nav className="flex items-center gap-2" role="group" aria-label="Preview controls">
          {/* Echo toggle */}
          <label className="flex items-center gap-2 text-sm text-[#E5E9F2]" htmlFor="show-echo-toggle">
            <input
              id="show-echo-toggle"
              type="checkbox"
              className="h-4 w-4 accent-[#87CEEB]"
              checked={showEcho}
              onChange={(e) => setShowEcho(e.target.checked)}
              aria-label="Show echo messages in preview"
            />
            <span>Show echo messages</span>
          </label>
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
              {linesForDisplay.map((line, idx) => (
                <div key={idx} className="flex">
                  <span aria-hidden="true" className="w-8 md:w-10 text-left pr-2 text-[#A0AA95] select-none">{idx + 1}</span>
                  {renderColoredLine(line)}
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