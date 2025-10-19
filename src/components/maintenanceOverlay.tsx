

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

    const containerClasses = `maintenance-overlay fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-[9999] ${desktopOnly ? 'hidden md:flex' : 'flex'
        } items-center justify-center ${className}`;

    // Determine which icon to show
    const displayIcon = brandIcon || (
        brandLogoUrl ? (
            <img
                src={brandLogoUrl}
                alt={`${brandName} logo`}
                className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 mb-4 sm:mb-5 md:mb-6 object-contain drop-shadow-lg"
                style={{
                    animation: 'maintenance-intermittent-spin 8s ease-in-out infinite'
                }}
            />
        ) : (
            <svg
                className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 text-yellow-400 mb-4 sm:mb-5 md:mb-6 drop-shadow-lg"
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

    // Inject keyframe animation into document head
    React.useEffect(() => {
        // Check if style already exists
        const existingStyle = document.getElementById('maintenance-spinner-animation');
        if (existingStyle) return;

        const style = document.createElement('style');
        style.id = 'maintenance-spinner-animation';
        style.innerHTML = `
            @keyframes maintenance-intermittent-spin {
                0%, 37.5% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            const styleToRemove = document.getElementById('maintenance-spinner-animation');
            if (styleToRemove) {
                document.head.removeChild(styleToRemove);
            }
        };
    }, []);

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
            <div className="text-center text-white px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto w-full">
                <div className="mb-4 sm:mb-6 md:mb-8">
                    {displayIcon}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl px-2">
                    {title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-7 md:mb-8 text-cyan-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto font-semibold drop-shadow-md px-2">
                    {message}
                </p>

                <div className="mb-6 sm:mb-7 md:mb-8">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-300 mb-3 sm:mb-4 px-2">
                        {subtitle}
                    </p>
                    {expectedCompletion && (
                        <p className="text-xs sm:text-sm md:text-base text-pink-400 font-medium px-2">
                            Expected completion: {expectedCompletion}
                        </p>
                    )}
                </div>

                {showSpinner && (
                    <div className="flex justify-center space-x-4 my-6 sm:my-8">
                        <div className="rounded-full h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 border-b-2 border-yellow-400 border-t-2 border-t-pink-500 animate-spin"></div>
                    </div>
                )}

                {showThankYou && (
                    <div className="mt-8 sm:mt-10 md:mt-12 text-xs sm:text-sm md:text-base text-green-300 px-2">
                        <p>{thankYouMessage}</p>
                        <p className="mt-1 sm:mt-2">- {brandName}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

