import React from 'react';

interface AnimatedGlowBorderProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'green' | 'purple' | 'primary';
}

export const AnimatedGlowBorder: React.FC<AnimatedGlowBorderProps> = ({
    children,
    className = '',
    variant = 'green'
}) => {
    // Color schemes based on variant
    const colorSchemes = {
        green: {
            gradient1: '#25D366, #128C7E',
            gradient2: '#075E54, #25D366',
            accent: '#25D366',
            bg: 'from-green-50 to-white',
        },
        purple: {
            gradient1: '#402fb5, #cf30aa',
            gradient2: '#18116a, #6e1b60',
            accent: '#cf30aa',
            bg: 'from-purple-50 to-white',
        },
        primary: {
            gradient1: '#ea580c, #f97316',
            gradient2: '#c2410c, #ea580c',
            accent: '#ea580c',
            bg: 'from-orange-50 to-white',
        },
    };

    const colors = colorSchemes[variant];

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <div className="relative w-full group">
                {/* Outer glow layer 1 */}
                <div
                    className="absolute z-0 overflow-hidden h-full w-full rounded-xl blur-[3px]"
                    style={{
                        background: `conic-gradient(from 0deg, transparent, ${colors.gradient1.split(',')[0]} 5%, transparent 38%, transparent 50%, ${colors.gradient1.split(',')[1]} 60%, transparent 87%)`,
                    }}
                >
                    <div
                        className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            background: `conic-gradient(from 0deg, transparent, ${colors.gradient1.split(',')[0]} 5%, transparent 38%, transparent 50%, ${colors.gradient1.split(',')[1]} 60%, transparent 87%)`,
                            animation: 'glow-rotate 4s linear infinite',
                        }}
                    />
                </div>

                {/* Outer glow layer 2 */}
                <div
                    className="absolute z-0 overflow-hidden h-full w-full rounded-xl blur-[2px]"
                >
                    <div
                        className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            background: `conic-gradient(from 90deg, transparent, ${colors.gradient2.split(',')[0]} 8%, transparent 15%, transparent 50%, ${colors.gradient2.split(',')[1]} 58%, transparent 65%)`,
                            animation: 'glow-rotate 4s linear infinite reverse',
                        }}
                    />
                </div>

                {/* Inner bright accent */}
                <div
                    className="absolute z-0 overflow-hidden h-full w-full rounded-xl blur-[1px]"
                >
                    <div
                        className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
                        style={{
                            background: `conic-gradient(from 180deg, transparent 0%, ${colors.accent} 3%, transparent 6%, transparent 50%, ${colors.accent} 53%, transparent 56%)`,
                            animation: 'glow-rotate 3s linear infinite',
                        }}
                    />
                </div>

                {/* Content container with solid background */}
                <div className={`relative z-10 bg-gradient-to-br ${colors.bg} rounded-xl m-[2px]`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AnimatedGlowBorder;
