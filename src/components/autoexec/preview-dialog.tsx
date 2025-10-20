import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import { generateAutoexecContent } from '@/lib/utils';
import { AutoexecFormValues } from '@/lib/schema';

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getValues: () => AutoexecFormValues;
}

const PreviewDialog = ({ open, onOpenChange, getValues }: PreviewDialogProps) => {
  const formValues = getValues();
  const content = open ? generateAutoexecContent(formValues) : [''];
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content.join('\n'))
      .then(() => {
        toast.success('Config copied to clipboard!', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
        toast.error('Failed to copy config to clipboard', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Preview Config</DialogTitle>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleCopyToClipboard}
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <pre className="max-h-[60vh] overflow-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50 whitespace-pre-wrap">
            <code aria-label="Autoexec preview with line numbers">
              {content.join('\n').split('\n').map((line, idx) => (
                <div key={idx} className="flex">
                  <span aria-hidden="true" className="w-8 md:w-10 text-left pr-2 text-[#A0AA95] select-none">{idx + 1}</span>
                  <span className="whitespace-pre-wrap">{line.length ? line : ' '}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
