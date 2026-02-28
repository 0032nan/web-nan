/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Web3 主题颜色（App.jsx 使用的）
        web3: {
          dark: '#0a0a1a',
          card: '#12121a',
          border: '#2a2a40',
          accent: '#00d4ff',
          'accent-hover': '#00a8cc',
        },
        // 赛博朋克深色背景
        cyber: {
          dark: '#0a0a1a',
          darker: '#050510',
          card: '#12121a',
          'card-hover': '#1a1a28',
          border: '#2a2a40',
          'border-glow': '#3a3a55',
        },
        // 霓虹光效
        neon: {
          cyan: '#00d4ff',
          purple: '#a855f7',
          pink: '#ec4899',
          green: '#00ff88',
          yellow: '#fbbf24',
          red: '#ff4444',
        },
        // 状态颜色
        status: {
          pending: '#fbbf24',
          done: '#00ff88',
          focus: '#a855f7',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        // 霓虹脉冲
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        // 渐变流动
        'gradient': 'gradient 8s ease infinite',
        // 悬浮效果
        'float': 'float 3s ease-in-out infinite',
        // 闪烁效果
        'flicker': 'flicker 1.5s infinite alternate',
        // 扫描线
        'scanline': 'scanline 8s linear infinite',
        // 渐入动画
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-scale': 'fadeInScale 0.4s ease-out',
        // 发光脉冲
        'glow': 'glow 2s ease-in-out infinite alternate',
        // 数字滚动
        'count-up': 'countUp 0.5s ease-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff' },
          '50%': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.5), 0 0 10px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)' },
        },
        countUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
        'neon-gradient': 'linear-gradient(90deg, #00d4ff, #a855f7, #ec4899, #00d4ff)',
        'card-gradient': 'linear-gradient(145deg, rgba(18,18,26,0.9) 0%, rgba(26,26,40,0.8) 100%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-purple': '0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)',
        'neon-pink': '0 0 10px rgba(236, 72, 153, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.glass': {
          background: 'rgba(18, 18, 26, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.glass-strong': {
          background: 'rgba(18, 18, 26, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.neon-border': {
          border: '1px solid rgba(0, 212, 255, 0.3)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.2), inset 0 0 10px rgba(0, 212, 255, 0.05)',
        },
        '.neon-text': {
          textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
        },
        '.cyber-grid': {
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        },
        '.cyber-lines': {
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(168, 85, 247, 0.02) 2px,
              rgba(168, 85, 247, 0.02) 4px
            )
          `,
        },
      })
    },
  ],
}
