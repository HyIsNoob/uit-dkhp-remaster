// Theme system index - Export tất cả theme modules

export * from './colors';
export * from './typography';
export * from './theme';

// Import chính để sử dụng dễ dàng
export { lightTheme as defaultTheme, darkTheme, themeUtils } from './theme';
export { colors, colorUtils } from './colors';
export { typography, customTypography, googleFontsLink } from './typography';

// Theme context và hook sẽ được thêm sau
export type { Theme } from '@mui/material/styles'; 