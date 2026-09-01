import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

/** Desktop only — on mobile the bottom action bar already carries WhatsApp. */
export function DesktopWhatsApp() {
  return (
    <div className="fixed right-6 bottom-6 z-40 hidden md:block">
      <WhatsAppButton variant="floating" />
    </div>
  );
}
