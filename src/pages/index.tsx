import React, { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { autoexecFormSchema, type AutoexecFormValues } from '@/lib/schema';
import { defaultAutoexecValues, generateAutoexecContent } from '@/lib/utils';
import MainLayout from '@/components/layout/main-layout';
import { RetroButton } from '@/components/ui/retro-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/retro-card';
import AutoexecForm from '@/components/autoexec/autoexec-form';
import StandalonePreview from '@/components/autoexec/standalone-preview';
import PreviewDialog from '@/components/autoexec/preview-dialog';
import { useRouter } from 'next/router';
import Head from 'next/head';


export default function HomePage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();
  
  // Setup form with all the comprehensive HUD & UI Advanced Settings
  const methods = useForm<AutoexecFormValues>({
    resolver: zodResolver(autoexecFormSchema),
    // Ensure default values conform to the zod schema and strip unknown keys
    defaultValues: autoexecFormSchema.parse(defaultAutoexecValues as any),
    mode: 'onChange',
  });
  
  // Handle router errors - fixes "Error rendering page: {\"cancelled\":true}" messages
  useEffect(() => {
    const handleRouteChangeError = (err: Error) => {
      // Ignore the cancelled errors which cause console spam
      if (err.message.includes('cancelled')) {
        // This is normal behavior, not a real error
        return;
      }
      console.error('Navigation error:', err);
    };

    router.events.on('routeChangeError', handleRouteChangeError);
    
    return () => {
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);
  
  const onSubmit = useCallback((data: AutoexecFormValues) => {
    try {
      const content = generateAutoexecContent(data);
      const fileContent = content.join('\n');
      const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'autoexec.cfg');
      
      toast.success('Autoexec.cfg file generated successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error generating autoexec.cfg:', error);
      toast.error('Failed to generate autoexec.cfg file', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  }, []);
  
  const handlePreview = useCallback(() => {
    setPreviewOpen(true);
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>CS2 Autoexec Generator - Retro Edition</title>
        <meta name="description" content="Generate a custom Counter-Strike 2 autoexec.cfg file with a retro twist" />
      </Head>
      
      <article className="flex flex-col space-y-8 max-w-6xl mx-auto w-full px-4 pt-8" aria-labelledby="page-title">
        {/* Page header / hero */}
        <section className="retro-header-wrapper" role="region" aria-labelledby="page-title">
          <div className="retro-header-top">
            <header className="relative">
              <h1 id="page-title" className="relative z-10 text-4xl md:text-5xl font-ui mb-4">
                CS2 AUTOEXEC GENERATOR
              </h1>
              <p className="relative z-10 text-lg mb-0">
                <span className="inline-block border-b-2 border-dashed border-white pb-1">
                  Build a CS2 Autoexec That Doesn't Suck.
                </span>
              </p>
              <img src="/images/BLOODSPORT%20LOGO.webp" alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[85%] opacity-55 pointer-events-none select-none z-0" />
              </header>
            </div>
            
            <div className="retro-header-bottom">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="space-y-4" aria-labelledby="features-heading">
                  <h2 id="features-heading" className="text-2xl font-ui">Features</h2>
                  <ul className="space-y-2 font-ui" aria-label="Feature list">
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-yellow-400 border-2 border-black mr-2 flex-shrink-0" aria-hidden="true"></span>
                      <span>Advanced HUD & UI Settings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-yellow-400 border-2 border-black mr-2 flex-shrink-0" aria-hidden="true"></span>
                      <span>Crosshair Customization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-yellow-400 border-2 border-black mr-2 flex-shrink-0" aria-hidden="true"></span>
                      <span>Radar & Minimap Tweaks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-yellow-400 border-2 border-black mr-2 flex-shrink-0" aria-hidden="true"></span>
                      <span>Performance Optimizations</span>
                    </li>
                  </ul>
                </section>
                
                <section className="space-y-4" aria-labelledby="quickstart-heading">
                  <h2 id="quickstart-heading" className="text-2xl font-ui">Quick Start</h2>
                  <ol className="space-y-2 list-decimal list-inside font-ui" aria-label="Quick start steps">
                    <li>Configure your settings below</li>
                    <li>Preview your configuration</li>
                    <li>Generate and download your autoexec.cfg</li>
                    <li>Place it in your CS2 cfg folder</li>
                  </ol>
                  
                  <div className="flex flex-wrap gap-4 pt-4 justify-center" role="group" aria-label="Quick actions">
                    <RetroButton 
                      type="button"
                      onClick={methods.handleSubmit(onSubmit)}
                      variant="primary"
                      className="text-sm md:text-base"
                      aria-label="Generate autoexec.cfg"
                    >
                      Generate Autoexec
                    </RetroButton>
                    <RetroButton 
                      type="button"
                      onClick={handlePreview}
                      variant="outline"
                      className="text-sm md:text-base"
                      aria-label="Preview autoexec configuration"
                    >
                      Preview Config
                    </RetroButton>
                  </div>
                </section>
              </section>
            </div>
          </section>

          {/* Standalone Preview Window */}
          <FormProvider {...methods}>
            <StandalonePreview />
            <AutoexecForm />
          </FormProvider>

          {/* CheckmarkSection - rebuilt from scratch */}
          {/* Included via AutoexecForm accordion; removed separate IncludeOptionsSection */}
          
          <PreviewDialog 
            open={previewOpen} 
            onOpenChange={setPreviewOpen}
            getValues={methods.getValues}
          />
        </article>
      </MainLayout>
    );
}
