// Script Generator cho ĐKHP UIT - Phiên bản cải tiến
// Dựa trên dkhp1.txt nhưng đã sửa lỗi và thêm tính năng

export interface ScriptConfig {
  classCodes: string[];
  enableAutoSubmit: boolean;
  submitDelay: number; // seconds
  retryAttempts: number;
  enableLogging: boolean;
  waitTimeout: number; // milliseconds
}

export const defaultConfig: ScriptConfig = {
  classCodes: [],
  enableAutoSubmit: true,
  submitDelay: 2,
  retryAttempts: 3,
  enableLogging: true,
  waitTimeout: 10000,
};

// Template script cải tiến
export function generateDKHPScript(config: ScriptConfig): string {
  const { 
    classCodes, 
    enableAutoSubmit, 
    submitDelay, 
    retryAttempts,
    enableLogging,
    waitTimeout 
  } = config;

  const classCodesString = classCodes.join(',');

  return `
// =============================================================================
// 🎓 SCRIPT ĐĂNG KÝ HỌC PHẦN UIT - PHIÊN BẢN CẢI TIẾN 2024
// =============================================================================
// ✨ Tính năng mới:
// - Tự động submit sau khi chọn môn
// - Error handling và retry mechanism  
// - Logging chi tiết cho debug
// - Delay có thể cấu hình
// - Confirmation dialog trước khi submit
// =============================================================================

// Cấu hình
const CONFIG = {
  monDangKy: "${classCodesString}",
  enableAutoSubmit: ${enableAutoSubmit},
  submitDelay: ${submitDelay}, // giây
  retryAttempts: ${retryAttempts},
  enableLogging: ${enableLogging},
  waitTimeout: ${waitTimeout}, // milliseconds
};

// Utility functions
const Logger = {
  log: function(message, type = 'info') {
    if (!CONFIG.enableLogging) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(\`[\${timestamp}] \${prefix} \${message}\`);
  },
  
  error: function(message) {
    this.log(message, 'error');
  },
  
  success: function(message) {
    this.log(message, 'success');
  }
};

// Delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Wait for element with improved error handling
function waitForElement(selector, timeout = CONFIG.waitTimeout) {
  Logger.log(\`Đang chờ element: \${selector}\`);
  
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      Logger.success(\`Đã tìm thấy element: \${selector}\`);
      return resolve(element);
    }

    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector);
      if (element) {
        Logger.success(\`Đã tìm thấy element sau khi chờ: \${selector}\`);
        resolve(element);
        observer.disconnect();
        clearTimeout(timeoutId);
      }
    });

    const timeoutId = setTimeout(() => {
      observer.disconnect();
      Logger.error(\`Timeout: Không tìm thấy element \${selector} sau \${timeout}ms\`);
      reject(new Error(\`Element not found: \${selector}\`));
    }, timeout);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// Class selection handler with retry mechanism
async function handleClassSelection(classCodes) {
  Logger.log('Bắt đầu quá trình chọn lớp...');
  
  for (let attempt = 1; attempt <= CONFIG.retryAttempts; attempt++) {
    try {
      Logger.log(\`Lần thử \${attempt}/\${CONFIG.retryAttempts}\`);
      
      // Wait for table rows
      await waitForElement("tbody > tr");
      const table = document.getElementsByTagName("tbody")[0];
      
      if (!table) {
        throw new Error('Không tìm thấy bảng danh sách lớp');
      }
      
      const rows = table.getElementsByTagName("tr");
      Logger.log(\`Tìm thấy \${rows.length} dòng trong bảng\`);
      
      const results = await selectClasses(rows, classCodes);
      
      if (results.success.length > 0) {
        Logger.success(\`Đã chọn thành công \${results.success.length} lớp\`);
        return results;
      } else if (attempt === CONFIG.retryAttempts) {
        throw new Error('Không thể chọn được lớp nào');
      }
      
      Logger.log('Chờ 1 giây trước khi thử lại...');
      await delay(1000);
      
    } catch (error) {
      Logger.error(\`Lần thử \${attempt} thất bại: \${error.message}\`);
      
      if (attempt === CONFIG.retryAttempts) {
        throw error;
      }
      
      await delay(2000); // Wait 2 seconds before retry
    }
  }
}

// Select classes function  
async function selectClasses(rows, classCodes) {
  const results = {
    success: [],
    failed: [],
    notFound: []
  };

  function findClassCode(classCode) {
    Logger.log(\`Đang tìm lớp: \${classCode}\`);
    
    for (let row of rows) {
      try {
        const checkbox = row.getElementsByTagName("input")[0];
        const cells = row.getElementsByTagName("td");
        
        if (!checkbox || !cells || cells.length < 2) continue;
        
        if (cells[1].innerHTML.trim() === classCode.trim()) {
          if (checkbox.checked) {
            Logger.log(\`Lớp \${classCode} đã được chọn trước đó\`);
            return true;
          }
          
          checkbox.click();
          Logger.success(\`✅ Đã chọn lớp: \${classCode}\`);
          results.success.push(classCode);
          return true;
        }
      } catch (error) {
        Logger.error(\`Lỗi khi xử lý dòng cho lớp \${classCode}: \${error.message}\`);
      }
    }
    
    Logger.error(\`❌ Không tìm thấy lớp: \${classCode}\`);
    results.notFound.push(classCode);
    return false;
  }

  // Process each class code
  for (const classCode of classCodes) {
    try {
      findClassCode(classCode);
      await delay(100); // Small delay between selections
    } catch (error) {
      Logger.error(\`Lỗi khi chọn lớp \${classCode}: \${error.message}\`);
      results.failed.push(classCode);
    }
  }

  return results;
}

// Auto submit function
async function handleAutoSubmit() {
  if (!CONFIG.enableAutoSubmit) {
    Logger.log('Auto submit đã tắt');
    return;
  }

  try {
    Logger.log(\`Chờ \${CONFIG.submitDelay} giây trước khi submit...\`);
    
    // Countdown
    for (let i = CONFIG.submitDelay; i > 0; i--) {
      Logger.log(\`Submit trong \${i} giây...⏰\`);
      await delay(1000);
    }

    // Show confirmation dialog
    const shouldSubmit = confirm(
      \`🎓 ĐĂNG KÝ HỌC PHẦN UIT\\n\\n\` +
      \`Bạn có chắc chắn muốn submit đăng ký không?\\n\\n\` +
      \`⚠️ Hành động này không thể hoàn tác!\\n\\n\` +
      \`Nhấn OK để tiếp tục, Cancel để dừng lại.\`
    );

    if (!shouldSubmit) {
      Logger.log('❌ Người dùng đã hủy submit');
      return;
    }

    // Find and click submit button
    const submitButton = await waitForElement(".detailBar button.chakra-button");
    
    if (submitButton) {
      Logger.log('🚀 Đang submit...');
      submitButton.click();
      Logger.success('✅ Đã click submit thành công!');
      
      // Show final message
      setTimeout(() => {
        alert('🎉 Script đã hoàn thành!\\n\\nVui lòng kiểm tra kết quả đăng ký.');
      }, 1000);
    } else {
      throw new Error('Không tìm thấy nút submit');
    }
    
  } catch (error) {
    Logger.error(\`Lỗi khi submit: \${error.message}\`);
    alert(\`❌ Lỗi submit: \${error.message}\`);
  }
}

// Main execution function
async function main() {
  try {
    Logger.log('🚀 Bắt đầu script ĐKHP UIT...');
    Logger.log(\`📋 Danh sách môn cần đăng ký: \${CONFIG.monDangKy}\`);
    
    if (!CONFIG.monDangKy) {
      throw new Error('Chưa cấu hình danh sách môn học');
    }

    const classCodes = CONFIG.monDangKy.split(",").map(code => code.trim()).filter(code => code);
    
    if (classCodes.length === 0) {
      throw new Error('Danh sách môn học trống');
    }

    Logger.log(\`📚 Sẽ đăng ký \${classCodes.length} lớp\`);

    // Execute class selection
    const results = await handleClassSelection(classCodes);
    
    // Show results
    Logger.log('📊 KẾT QUẢ TỔNG HỢP:');
    Logger.success(\`✅ Đã chọn: \${results.success.length} lớp\`);
    Logger.error(\`❌ Không tìm thấy: \${results.notFound.length} lớp\`);
    Logger.error(\`⚠️ Lỗi: \${results.failed.length} lớp\`);

    if (results.notFound.length > 0) {
      Logger.error(\`Các lớp không tìm thấy: \${results.notFound.join(', ')}\`);
    }

    if (results.failed.length > 0) {
      Logger.error(\`Các lớp bị lỗi: \${results.failed.join(', ')}\`);
    }

    // Auto submit if enabled and has selections
    if (results.success.length > 0) {
      await handleAutoSubmit();
    } else {
      Logger.error('Không có lớp nào được chọn, bỏ qua submit');
    }

  } catch (error) {
    Logger.error(\`❌ Script thất bại: \${error.message}\`);
    alert(\`Script lỗi: \${error.message}\`);
  }
}

// Show welcome message and start
Logger.log('');
Logger.log('🎓='.repeat(30));
Logger.log('🎓 SCRIPT ĐKHP UIT - PHIÊN BẢN CẢI TIẾN');
Logger.log('🎓 Tác giả: UIT Tools Community');
Logger.log('🎓 Phiên bản: 2024.1');
Logger.log('🎓='.repeat(30));
Logger.log('');

// Start the script
main().then(() => {
  Logger.log('Script đã hoàn thành hoặc dừng lại');
}).catch((error) => {
  Logger.error(\`Script kết thúc với lỗi: \${error.message}\`);
});

// Export for external use
return { CONFIG, main, Logger };
`.trim();
}

// Function to download script as file
export function downloadScript(config: ScriptConfig, filename = 'dkhp-uit-script.js') {
  const script = generateDKHPScript(config);
  const blob = new Blob([script], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

// Function to copy script to clipboard
export async function copyScriptToClipboard(config: ScriptConfig): Promise<boolean> {
  try {
    const script = generateDKHPScript(config);
    await navigator.clipboard.writeText(script);
    return true;
  } catch (error) {
    console.error('Failed to copy script to clipboard:', error);
    return false;
  }
} 