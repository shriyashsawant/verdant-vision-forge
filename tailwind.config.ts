import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 1px)',
				sm: 'calc(var(--radius) - 2px)',
				none: '0',
				sharp: '2px'
			},
			keyframes: {
				// Accordion Animations
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				
				// Neon & Glow Animations
				'pulse-neon': {
					'0%, 100%': { 
						boxShadow: 'var(--shadow-neon-primary)',
						filter: 'brightness(1)' 
					},
					'50%': { 
						boxShadow: 'var(--shadow-rainbow)',
						filter: 'brightness(1.2)' 
					}
				},
				'pulse-glow': {
					'0%': { filter: 'brightness(1) saturate(1)' },
					'100%': { filter: 'brightness(1.3) saturate(1.5)' }
				},
				'flicker': {
					'0%, 100%': { 
						textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary))',
						opacity: '1' 
					},
					'50%': { 
						textShadow: '0 0 15px hsl(var(--primary)), 0 0 25px hsl(var(--primary))',
						opacity: '0.8' 
					}
				},
				
				// Rainbow Animations
				'rainbow-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'rainbow-spin': {
					'0%': { filter: 'hue-rotate(0deg)' },
					'100%': { filter: 'hue-rotate(360deg)' }
				},
				
				// Sharp Movement Animations
				'bounce-sharp': {
					'0%, 100%': { 
						transform: 'translateY(0) rotate(0deg)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
					},
					'50%': { 
						transform: 'translateY(-25%) rotate(2deg)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-5px)' },
					'75%': { transform: 'translateX(5px)' }
				},
				
				// Scale Animations
				'scale-bounce': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05) rotate(1deg)' },
					'100%': { transform: 'scale(1)' }
				},
				'scale-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				
				// Slide Animations
				'slide-up-bounce': {
					'0%': { 
						transform: 'translateY(100%) scale(0.9)',
						opacity: '0' 
					},
					'100%': { 
						transform: 'translateY(0) scale(1)',
						opacity: '1' 
					}
				},
				'slide-down-bounce': {
					'0%': { 
						transform: 'translateY(-100%) scale(0.9)',
						opacity: '0' 
					},
					'100%': { 
						transform: 'translateY(0) scale(1)',
						opacity: '1' 
					}
				}
			},
			animation: {
				// Basic Animations
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// Neon Effects
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'flicker': 'flicker 2s ease-in-out infinite alternate',
				
				// Rainbow Effects
				'rainbow-shift': 'rainbow-shift 3s ease infinite',
				'rainbow-spin': 'rainbow-spin 3s linear infinite',
				
				// Sharp Movements
				'bounce-sharp': 'bounce-sharp 1s infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
				
				// Scale Effects
				'scale-bounce': 'scale-bounce 0.6s ease-in-out',
				'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
				
				// Slide Effects
				'slide-up-bounce': 'slide-up-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'slide-down-bounce': 'slide-down-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
