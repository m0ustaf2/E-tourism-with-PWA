import { useEffect, useState } from "react";
import { GrInstallOption } from "react-icons/gr";
interface Navigator {
  standalone?: boolean;
}
export default function InstallBtn() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const isAppInstalled = () => {
      // Extend the Navigator interface to include the standalone property
      // Function to check if the app is running in standalone mode
      function isStandalone(): boolean {
        return (window.navigator as Navigator).standalone === true;
      }

      // Example usage
      if (isStandalone()) {
        console.log("App is running in standalone mode");
      } else {
        console.log("App is not running in standalone mode");
      }
      // Check if app is installed on other platforms
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return true;
      }
      return false;
    };

    if (isAppInstalled()) {
      setIsInstallable(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as any).prompt();
    const { outcome } = await (deferredPrompt as any).userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable) {
    return null;
  }
  return (
    <>
      <button
        onClick={handleInstallClick}
        className="overflow-hidden animate-bounce hover:animate-none relative w-32 p-2 h-12 bg-blue-500 text-white border-none rounded-full text-xl font-bold cursor-pointer flex justify-center items-center  z-10 group"
      >
        Install
        <GrInstallOption className="mx-1" />
        <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left" />
        <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left" />
        <span className="absolute w-36 h-32 -top-8 -left-2 bg-yellow-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left" />
        <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left z-10">
          <GrInstallOption className="text-2xl" />
        </span>
      </button>
    </>
  );
}
