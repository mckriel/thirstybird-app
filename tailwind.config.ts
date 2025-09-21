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
			padding: '1rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px'
			}
		},
		extend: {
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
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
					DEFAULT: 'hsl(var(--inactive))',
					foreground: 'hsl(var(--inactive-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				'button-black': {
					DEFAULT: 'hsl(var(--button-black))',
					foreground: 'hsl(var(--button-black-foreground))'
				},
				inactive: {
					DEFAULT: 'hsl(var(--inactive))',
					foreground: 'hsl(var(--inactive-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--inactive))',
					foreground: 'hsl(var(--inactive-foreground))'
				},
				destructive: {
					DEFAULT: '0 84.2% 60.2%',
					foreground: '210 40% 98%'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 4px)',
				sm: 'calc(var(--radius) - 8px)',
				'2xl': 'calc(var(--radius) + 4px)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'modal': 'var(--shadow-modal)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'confetti-burst': {
					'0%': { 
						transform: 'scale(0) rotate(0deg)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.2) rotate(180deg)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'scale(1) rotate(360deg)',
						opacity: '0'
					}
				},
				'slide-up': {
					from: {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					to: {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-down': {
					from: {
						transform: 'translateY(0)',
						opacity: '1'
					},
					to: {
						transform: 'translateY(100%)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'confetti-burst': 'confetti-burst 0.6s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;