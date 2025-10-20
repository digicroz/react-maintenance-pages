

import React from 'react';

/**
 * Props for the MaintenanceOverlay component
 */
export interface MaintenanceOverlayProps {
    // ===== REQUIRED =====
    /** Main maintenance message to display */
    message: string;
    /** Brand/Company name */
    brandName: string;

    // ===== OPTIONAL CONFIGURATION =====
    /** Whether maintenance mode is enabled (default: true) */
    enabled?: boolean;
    /** Custom title (default: "Site Under Maintenance") */
    title?: string;
    /** Custom subtitle message (default: "Please visit us later.") */
    subtitle?: string;
    /** Expected completion time/date */
    expectedCompletion?: string;
    /** Custom thank you message (default: "Thank you for your patience!") */
    thankYouMessage?: string;

    // ===== BRANDING =====
    /** Brand logo URL */
    brandLogoUrl?: string;
    /** Custom brand icon element to replace the default gear icon */
    brandIcon?: React.ReactNode;

    // ===== DISPLAY OPTIONS =====
    /** Show loading spinner (default: true) */
    showSpinner?: boolean;
    /** Show "Thank you" message (default: true) */
    showThankYou?: boolean;
    /** Only show on desktop - uses md: breakpoint (default: false) */
    desktopOnly?: boolean;

    // ===== STYLING =====
    /** Custom CSS classes for the overlay container */
    className?: string;
}

/**
 * A reusable maintenance overlay component for React applications.
 * 
 * @example
 * ```tsx
 * <MaintenanceOverlay
 *   message="We're upgrading our systems to serve you better."
 *   brandName="Acme Corp"
 *   expectedCompletion="2 hours"
 * />
 * ```
 * 
 * @example With branding
 * ```tsx
 * <MaintenanceOverlay
 *   message="We're upgrading our systems"
 *   brandName="Acme Corp"
 *   brandLogoUrl="/logo.png"
 *   thankYouMessage="We appreciate your patience!"
 * />
 * ```
 */
export const MaintenanceOverlay: React.FC<MaintenanceOverlayProps> = ({
    // Required
    message,
    brandName,

    // Optional with defaults
    enabled = true,
    title = "Site Under Maintenance",
    subtitle = "Please visit us later.",
    expectedCompletion,
    thankYouMessage = "Thank you for your patience!",

    // Branding
    brandLogoUrl,
    brandIcon,

    // Display
    showSpinner = true,
    showThankYou = true,
    desktopOnly = false,

    // Styling
    className = "",
}) => {
    // Don't render if maintenance mode is disabled
    if (!enabled) {
        return null;
    }

    const containerClasses = `maintenance-overlay rmp-fixed rmp-inset-0 rmp-bg-gradient-to-br rmp-from-purple-900 rmp-via-blue-900 rmp-to-indigo-900 rmp-z-[9999] ${desktopOnly ? 'rmp-hidden md:rmp-flex' : 'rmp-flex'
        } rmp-items-center rmp-justify-center ${className}`;

    // Determine which icon to show
    const displayIcon = brandIcon || (
        brandLogoUrl ? (
            <img
                src={brandLogoUrl}
                alt={`${brandName} logo`}
                className="rmp-mx-auto rmp-h-12 rmp-w-12 sm:rmp-h-14 sm:rmp-w-14 md:rmp-h-16 md:rmp-w-16 lg:rmp-h-20 lg:rmp-w-20 rmp-mb-4 sm:rmp-mb-5 md:rmp-mb-6 rmp-object-contain rmp-drop-shadow-lg"
                style={{
                    animation: 'maintenance-intermittent-spin 8s ease-in-out infinite'
                }}
            />
        ) : (
            <svg
                className="rmp-mx-auto rmp-h-12 rmp-w-12 sm:rmp-h-14 sm:rmp-w-14 md:rmp-h-16 md:rmp-w-16 lg:rmp-h-20 lg:rmp-w-20 rmp-text-yellow-400 rmp-mb-4 sm:rmp-mb-5 md:rmp-mb-6 rmp-drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    animation: 'maintenance-intermittent-spin 8s ease-in-out infinite'
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        )
    );

    // Prevent body scroll when overlay is active
    React.useEffect(() => {
        if (enabled) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            return () => {
                document.body.style.overflow = '';
                document.body.style.height = '';
            };
        }
    }, [enabled]);

    // Animation is now handled by CSS file, no need to inject

    return (
        <div
            className={containerClasses}
            style={{
                position: 'fixed',
                zIndex: 2147483647,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: '#1a0b2e',
                backgroundImage: 'linear-gradient(to bottom right, #581c87, #1e3a8a, #312e81)',
                opacity: 1
            }}
        >
            <div className="rmp-text-center rmp-text-white rmp-px-4 sm:rmp-px-6 md:rmp-px-8 lg:rmp-px-10 rmp-max-w-7xl rmp-mx-auto rmp-w-full">
                <div className="rmp-mb-4 sm:rmp-mb-6 md:rmp-mb-8">
                    {displayIcon}
                </div>

                <h1 className="rmp-text-3xl sm:rmp-text-4xl md:rmp-text-5xl lg:rmp-text-6xl xl:rmp-text-7xl rmp-font-bold rmp-mb-4 sm:rmp-mb-5 md:rmp-mb-6 rmp-bg-gradient-to-r rmp-from-yellow-400 rmp-via-pink-500 rmp-to-purple-500 rmp-bg-clip-text rmp-text-transparent rmp-drop-shadow-2xl rmp-px-2">
                    {title}
                </h1>

                <p className="rmp-text-base sm:rmp-text-lg md:rmp-text-xl lg:rmp-text-2xl rmp-mb-6 sm:rmp-mb-7 md:rmp-mb-8 rmp-text-cyan-300 rmp-max-w-xs sm:rmp-max-w-md md:rmp-max-w-lg lg:rmp-max-w-2xl xl:rmp-max-w-3xl rmp-mx-auto rmp-font-semibold rmp-drop-shadow-md rmp-px-2">
                    {message}
                </p>

                <div className="rmp-mb-6 sm:rmp-mb-7 md:rmp-mb-8">
                    <p className="rmp-text-sm sm:rmp-text-base md:rmp-text-lg lg:rmp-text-xl rmp-text-purple-300 rmp-mb-3 sm:rmp-mb-4 rmp-px-2">
                        {subtitle}
                    </p>
                    {expectedCompletion && (
                        <p className="rmp-text-xs sm:rmp-text-sm md:rmp-text-base rmp-text-pink-400 rmp-font-medium rmp-px-2">
                            Expected completion: {expectedCompletion}
                        </p>
                    )}
                </div>

                {showSpinner && (
                    <div className="rmp-flex rmp-justify-center rmp-space-x-4 rmp-my-6 sm:rmp-my-8">
                        <div className="rmp-rounded-full rmp-h-6 rmp-w-6 sm:rmp-h-7 sm:rmp-w-7 md:rmp-h-8 md:rmp-w-8 lg:rmp-h-10 lg:rmp-w-10 rmp-border-b-2 rmp-border-yellow-400 rmp-border-t-2 rmp-border-t-pink-500 rmp-animate-spin"></div>
                    </div>
                )}

                {showThankYou && (
                    <div className="rmp-mt-8 sm:rmp-mt-10 md:rmp-mt-12 rmp-text-xs sm:rmp-text-sm md:rmp-text-base rmp-text-green-300 rmp-px-2">
                        <p>{thankYouMessage}</p>
                        <p className="rmp-mt-1 sm:rmp-mt-2">- {brandName}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

