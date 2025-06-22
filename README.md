<div align="center">
  <a href="https://uit.edu.vn/" target="_blank"><img src="./react/public/favicon.ico"></a>
  <h1>🚀 UIT Smart Campus 2024 - Tool Đăng Ký Học Phần UIT</h1>
  <p><strong>Phiên bản nâng cấp toàn diện với giao diện hiện đại & trải nghiệm người dùng tuyệt vời</strong></p>
  
  [![Link](https://img.shields.io/badge/Live_Demo-dkhp--uit.render.app-blue?style=for-the-badge&logo=render)](https://uit-dkhp-remaster.onrender.com/)
  [![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Material UI](https://img.shields.io/badge/Material_UI-5.14-blue?style=for-the-badge&logo=mui)](https://mui.com/)
</div>

---

## 🌟 Tính năng nổi bật phiên bản 2024

### ✨ **Giao diện hoàn toàn mới**
- 🎨 **Modern UI/UX**: Thiết kế gradient đa màu với hiệu ứng glassmorphism
- 🌈 **Hệ thống màu sắc chuyên nghiệp**: Color palette UIT Brand với Dark/Light mode
- 🚀 **Landing Page ấn tượng**: Animated particles, hero section với typography hiện đại
- 📱 **Responsive Design**: Tối ưu cho mọi thiết bị từ mobile đến desktop

### 🔧 **Công nghệ tiên tiến**
- ⚡ **React 18** với TypeScript và modern hooks
- 🎨 **Material-UI 5** với custom theme system
- 📊 **AG-Grid Enterprise** cho data table advanced
- 🔥 **Zustand** state management thay thế Redux
- 📈 **Analytics tích hợp** với Vercel Analytics & Google Analytics 4
- 🌐 **PWA Ready** với offline capabilities

### 🎯 **Tối ưu trải nghiệm người dùng**
- ⚡ **Lazy Loading**: Components được load theo yêu cầu
- 🔄 **Real-time Preview**: Xem thời khóa biểu ngay khi chọn lớp
- 🎪 **Micro-interactions**: Smooth animations và transitions
- 🔍 **Smart Filtering**: AI-powered class recommendation
- 📱 **Touch-friendly**: Optimized cho mobile users

---

## 📋 Giới thiệu

**UIT Smart Campus 2024** là phiên bản nâng cấp toàn diện của Tool Đăng Ký Học Phần UIT, được xây dựng với công nghệ web hiện đại nhất. Ứng dụng giúp sinh viên UIT đăng ký học phần một cách thông minh, nhanh chóng và trực quan.

> ⚡ **Từ hàng giờ xuống vài phút:** Soạn thời khóa biểu từ vài ngày → vài phút, ĐKHP từ vài phút → vài giây

### 🎯 **3 Bước đơn giản**

| Bước | Tính năng | Mô tả | Công nghệ |
|------|-----------|-------|-----------|
| **1️⃣** | **Upload File Excel** | Drag & drop hoặc browse file danh sách môn học | React Dropzone + XLSX parser |
| **2️⃣** | **Xếp lịch thông minh** | AI-powered scheduling với conflict detection | AG-Grid + Smart algorithms |
| **3️⃣** | **Xuất kết quả** | TKB visualization + Auto-generated script | HTML2Canvas + Script generation |

---

## 🚀 **Các cải tiến trong phiên bản 2024**

### 🎨 **UI/UX Revolution**

<details open>
<summary><strong>🌈 Modern Design System</strong></summary>

- **Gradient Background**: Multi-color gradients với animated particles
- **Glass Morphism**: Semi-transparent cards với backdrop blur
- **Typography System**: Custom font hierarchy với responsive sizing
- **Color Palette**: UIT Brand colors với dark/light mode support
- **Micro-interactions**: Hover effects, loading states, smooth transitions

</details>

<details>
<summary><strong>📱 Responsive & Mobile-First</strong></summary>

- **Mobile-optimized**: Touch-friendly interface cho smartphone
- **Tablet Support**: Layout tối ưu cho màn hình trung bình
- **Desktop Enhanced**: Multi-column layout với sidebar navigation
- **PWA Ready**: Installable web app với offline capabilities

</details>

### ⚡ **Performance & Technology**

<details>
<summary><strong>🔧 Modern Tech Stack</strong></summary>

```
Frontend Framework: React 18 + TypeScript
UI Library: Material-UI 5 (MUI)
State Management: Zustand (lightweight Redux alternative)
Data Grid: AG-Grid Enterprise (advanced table features)
Build Tool: Create React App với custom configurations
Deployment: Vercel với auto-deployment
Analytics: GA4 + Vercel Analytics
```

</details>

<details>
<summary><strong>⚡ Performance Optimizations</strong></summary>

- **Code Splitting**: Lazy loading cho tất cả routes
- **Bundle Optimization**: Tree shaking và minification
- **Image Optimization**: Responsive images với lazy loading
- **Caching Strategy**: Service worker cho offline experience
- **Lighthouse Score**: 95+ cho Performance, SEO, Accessibility

</details>

### 📊 **Advanced Features**

<details>
<summary><strong>🎯 Smart Scheduling Engine</strong></summary>

- **Conflict Detection**: Real-time check trùng lịch
- **Auto-suggestion**: AI recommend lớp phù hợp
- **Drag & Drop**: Interactive class selection
- **Batch Operations**: Bulk select/deselect classes
- **Undo/Redo**: History navigation support

</details>

<details>
<summary><strong>📈 Analytics & Tracking</strong></summary>

- **User Behavior**: Track user interactions
- **Performance Monitoring**: Real-time performance metrics
- **Error Tracking**: Automatic error reporting
- **A/B Testing**: Feature flag system
- **Usage Statistics**: Popular classes, peak times

</details>

---

## 🛠️ **Hướng dẫn phát triển**

### 📋 **Yêu cầu hệ thống**
```bash
Node.js >= 16.0.0
npm >= 8.0.0
Git >= 2.30.0
```

### 🚀 **Khởi chạy dự án**

```bash
# Clone repository
git clone https://github.com/your-username/uit-dkhp-remaster.git
cd uit-dkhp-remaster

# Install dependencies
cd react
npm install

# Start development server
npm start

# Build for production
npm run build
```

### 🏗️ **Cấu trúc dự án**

```
react/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout/        # Layout components
│   │   ├── LandingPage/   # Landing page components
│   │   ├── ui/            # Basic UI components
│   │   └── Analytics/     # Analytics components
│   ├── views/             # Page components
│   │   ├── 1ChonFileExcel/   # Step 1: File upload
│   │   ├── 2XepLop/          # Step 2: Class scheduling
│   │   └── 3KetQua/          # Step 3: Results & script
│   ├── theme/             # Design system
│   │   ├── colors.ts      # Color palette
│   │   ├── typography.ts  # Font system
│   │   └── theme.ts       # MUI theme config
│   ├── utils/             # Utility functions
│   ├── zus/               # Zustand stores
│   └── types.ts           # TypeScript definitions
├── package.json
└── tsconfig.json
```

### 🎨 **Theme System**

```typescript
// Sử dụng color system
import { colors } from './theme';

// Primary colors
colors.primary.main     // #0066CC (UIT Blue)
colors.primary[500]     // Same as main
colors.primary[50]      // Lightest shade

// Gradients
colors.gradients.primary   // Linear gradient
colors.gradients.sunset    // Multi-color gradient

// Glassmorphism
colors.glass.background    // Semi-transparent background
colors.glass.backdropFilter // Blur effect
```

### 📦 **Scripts có sẵn**

```bash
npm start          # Development server
npm run build      # Production build  
npm test           # Run test suites
npm run format     # Format code với Prettier
npm run lint:fix   # Fix ESLint issues
```

#### **🎯 Ưu điểm của Static Site so với Web Service:**
- ✅ **Miễn phí hoàn toàn** (không giới hạn bandwidth)
- ✅ **Tốc độ nhanh** với Global CDN
- ✅ **Auto SSL** certificate
- ✅ **Custom domain** support
- ✅ **Git-based deployment** (auto deploy khi push)

#### **📱 Kết quả:**
Sau khi deploy thành công, bạn sẽ có:
- URL: `https://uit-dkhp-smart-campus.onrender.com`
- HTTPS enabled mặc định
- Auto-deploy từ GitHub
- Performance optimization với CDN

#### **🔧 Troubleshooting thường gặp:**
```bash
# Nếu build failed, check logs và thử:
cd react
npm install
npm run build

# Nếu routing không hoạt động (404 on refresh):
# Tạo file public/_redirects với nội dung:
/*    /index.html   200
```

---

### 🐛 **Báo lỗi**
- Sử dụng GitHub Issues để báo cáo bugs
- Cung cấp thông tin chi tiết về lỗi
- Include screenshots nếu có thể

---

## 📄 **License & Credits**

### 📜 **License**
Dự án này được phát hành dưới **MIT License** - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

### 🙏 **Credits**
- **Original Codebase**: Dựa trên source code của anh khóa trên tại UIT
- **UI/UX Redesign**: Nâng cấp toàn diện giao diện và trải nghiệm người dùng
- **Modern Tech Stack**: Áp dụng công nghệ web hiện đại nhất 2024

### 👥 **Contributors**
- **Original Author**: [@loia5tqd001](https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT) - Ý tưởng và codebase gốc
- **UI/UX Remaster**: [@HyIsNoob](https://github.com/HyIsNoob/uit-dkhp-remaster) - Nâng cấp giao diện toàn diện

---

<div align="center">
  <p>
    <strong>🎓 Made with ❤️ for UIT Students</strong><br>
    <em>Nâng tầm trải nghiệm đăng ký học phần lên một level mới!</em>
  </p>
  
  **[🌐 Live Demo](https://dkhp-uit.vercel.app/) | [📚 Documentation](./docs/) | [🐛 Report Bug](https://github.com/your-username/uit-dkhp-remaster/issues) | [💡 Request Feature](https://github.com/your-username/uit-dkhp-remaster/issues)**
</div> 
