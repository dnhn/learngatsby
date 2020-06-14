import Typography from 'typography';

export default new Typography({
  includeNormalize: false,
  baseFontSize: 20,
  baseLineHeight: 1.6,
  googleFonts: [
    { name: 'Nunito', styles: ['700'] },
    { name: 'Lora', styles: ['400', '400i', '700', '700i'] },
    { name: 'IBM Plex Mono', styles: ['400&display=swap'] },
  ],
  headerFontFamily: ['Nunito', 'sans-serif'],
  bodyFontFamily: ['Lora', 'serif'],
});
