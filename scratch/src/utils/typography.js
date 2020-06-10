import Typography from 'typography';

export default new Typography({
  baseFontSize: 20,
  baseLineHeight: 1.6,
  googleFonts: [
    { name: 'Nunito', styles: ['700'] },
    { name: 'Lora', styles: ['400', '400i', '700', '700i'] },
    { name: 'IBM Plex Mono', styles: ['400'] },
  ],
  headerFontFamily: ['Nunito', 'sans-serif'],
  bodyFontFamily: ['Lora', 'serif'],
});
