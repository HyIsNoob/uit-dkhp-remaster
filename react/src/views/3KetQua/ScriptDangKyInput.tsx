import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  Alert,

  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Code as CodeIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import { colors } from '../../theme';
import { selectSelectedClassesBuoc3, useTkbStore } from '../../zus';
import { tracker } from '../..';

// Enhanced script template with better error handling and auto-submit
const generateEnhancedScript = (classIds: string[], options: any) => {
  const {
    autoSubmit = false,
    delayBetweenActions = 500,
    maxRetries = 3,
    enableLogging = true,
    confirmBeforeSubmit = true,
  } = options;

  return `
// ===== UIT SMART CAMPUS - AUTO REGISTRATION SCRIPT =====
// Enhanced by @HyIsNoob from original by @loia5tqd001
// Version: 2024.1.0 - Modern ES6+ with Auto-Submit
// ========================================================

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    classIds: ${JSON.stringify(classIds, null, 2)},
    autoSubmit: ${autoSubmit},
    delayBetweenActions: ${delayBetweenActions},
    maxRetries: ${maxRetries},
    enableLogging: ${enableLogging},
    confirmBeforeSubmit: ${confirmBeforeSubmit},
  };
  
  // Enhanced logging system
  const Logger = {
    log: (message, type = 'info') => {
      if (!CONFIG.enableLogging) return;
      const timestamp = new Date().toLocaleTimeString();
      const styles = {
        info: 'color: #2196F3; font-weight: bold;',
        success: 'color: #4CAF50; font-weight: bold;',
        warning: 'color: #FF9800; font-weight: bold;',
        error: 'color: #F44336; font-weight: bold;',
      };
      console.log(\`%c[UIT-SCRIPT \${timestamp}] \${message}\`, styles[type] || styles.info);
    },
    
    success: (msg) => Logger.log(msg, 'success'),
    warning: (msg) => Logger.log(msg, 'warning'),
    error: (msg) => Logger.log(msg, 'error'),
  };
  
  // Utility functions
  const Utils = {
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    waitForElement: async (selector, timeout = 5000) => {
      const start = Date.now();
      while (Date.now() - start < timeout) {
        const element = document.querySelector(selector);
        if (element) return element;
        await Utils.sleep(100);
      }
      throw new Error(\`Element not found: \${selector}\`);
    },
    
    safeClick: async (element, retries = CONFIG.maxRetries) => {
      for (let i = 0; i < retries; i++) {
        try {
          if (element && typeof element.click === 'function') {
            element.click();
            await Utils.sleep(CONFIG.delayBetweenActions);
            return true;
          }
        } catch (error) {
          Logger.warning(\`Click attempt \${i + 1} failed: \${error.message}\`);
          if (i === retries - 1) throw error;
          await Utils.sleep(1000);
        }
      }
      return false;
    },
    
    createProgressUI: () => {
      const progressContainer = document.createElement('div');
      progressContainer.id = 'uit-script-progress';
      progressContainer.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        min-width: 300px;
        backdrop-filter: blur(10px);
      \`;
      
      progressContainer.innerHTML = \`
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 12px; height: 12px; background: #4CAF50; border-radius: 50%; margin-right: 8px; animation: pulse 2s infinite;"></div>
          <strong>UIT Smart Registration</strong>
        </div>
        <div id="progress-text">Initializing...</div>
        <div style="background: rgba(255,255,255,0.2); height: 4px; border-radius: 2px; margin-top: 10px;">
          <div id="progress-bar" style="background: #FFD700; height: 100%; border-radius: 2px; width: 0%; transition: width 0.3s ease;"></div>
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        </style>
      \`;
      
      document.body.appendChild(progressContainer);
  return {
        updateText: (text) => {
          const textEl = document.getElementById('progress-text');
          if (textEl) textEl.textContent = text;
        },
        updateProgress: (percent) => {
          const barEl = document.getElementById('progress-bar');
          if (barEl) barEl.style.width = percent + '%';
        },
        remove: () => {
          const container = document.getElementById('uit-script-progress');
          if (container) container.remove();
        }
      };
    }
  };
  
  // Main registration logic
  class RegistrationBot {
    constructor() {
      this.progress = Utils.createProgressUI();
      this.registeredCount = 0;
      this.failedClasses = [];
    }
    
    async start() {
      try {
        Logger.log('🚀 Starting UIT Smart Registration Bot...');
        this.progress.updateText('Starting registration process...');
        
        await this.registerClasses();
        
        if (CONFIG.autoSubmit) {
          await this.handleAutoSubmit();
        }
        
        await this.showResults();
        
      } catch (error) {
        Logger.error(\`Registration failed: \${error.message}\`);
        this.progress.updateText(\`Error: \${error.message}\`);
        setTimeout(() => this.progress.remove(), 5000);
      }
    }
    
    async registerClasses() {
      const totalClasses = CONFIG.classIds.length;
      
      for (let i = 0; i < totalClasses; i++) {
        const classId = CONFIG.classIds[i];
        const progress = ((i + 1) / totalClasses) * (CONFIG.autoSubmit ? 80 : 100);
        
        this.progress.updateText(\`Registering class \${i + 1}/\${totalClasses}: \${classId}\`);
        this.progress.updateProgress(progress);
        
        try {
          await this.registerSingleClass(classId);
          this.registeredCount++;
          Logger.success(\`✅ Successfully registered: \${classId}\`);
        } catch (error) {
          this.failedClasses.push({ classId, error: error.message });
          Logger.error(\`❌ Failed to register \${classId}: \${error.message}\`);
        }
        
        await Utils.sleep(CONFIG.delayBetweenActions);
      }
    }
    
    async registerSingleClass(classId) {
      // Find and click the class checkbox
      const checkbox = await Utils.waitForElement(\`input[value="\${classId}"]\`);
      
      if (!checkbox) {
        throw new Error(\`Checkbox not found for class: \${classId}\`);
      }
      
      if (!checkbox.checked) {
        await Utils.safeClick(checkbox);
        Logger.log(\`📝 Checked class: \${classId}\`);
      } else {
        Logger.log(\`✓ Class already selected: \${classId}\`);
      }
    }
    
    async handleAutoSubmit() {
      if (!CONFIG.autoSubmit) return;
      
      this.progress.updateText('Preparing to submit...');
      this.progress.updateProgress(85);
      
      if (CONFIG.confirmBeforeSubmit) {
        const confirmed = confirm(
          \`🎯 Ready to submit registration for \${this.registeredCount} classes.\\n\\n\` +
          \`Classes: \${CONFIG.classIds.join(', ')}\\n\\n\` +
          \`Click OK to proceed or Cancel to stop.\`
        );
        
        if (!confirmed) {
          Logger.warning('⏸️ Auto-submit cancelled by user');
          this.progress.updateText('Auto-submit cancelled');
          return;
        }
      }
      
      try {
        // Find submit button (multiple possible selectors)
        const submitSelectors = [
          'input[type="submit"][value*="Đăng"]',
          'button[type="submit"]',
          'input[value*="Submit"]',
          '.btn-submit',
          '#submit-btn'
        ];
        
        let submitButton = null;
        for (const selector of submitSelectors) {
          submitButton = document.querySelector(selector);
          if (submitButton) break;
        }
        
        if (!submitButton) {
          throw new Error('Submit button not found');
        }
        
        this.progress.updateText('Submitting registration...');
        this.progress.updateProgress(95);
        
        await Utils.safeClick(submitButton);
        Logger.success('🎉 Registration submitted successfully!');
        
      } catch (error) {
        Logger.error(\`Submit failed: \${error.message}\`);
        throw error;
      }
    }
    
    async showResults() {
      this.progress.updateText('Registration completed!');
      this.progress.updateProgress(100);
      
      const summary = \`
📊 REGISTRATION SUMMARY
✅ Successfully registered: \${this.registeredCount}/\${CONFIG.classIds.length} classes
\${this.failedClasses.length > 0 ? \`❌ Failed classes: \${this.failedClasses.map(f => f.classId).join(', ')}\` : ''}
\${CONFIG.autoSubmit ? '🚀 Auto-submit: Enabled' : '⏸️ Auto-submit: Disabled'}
      \`;
      
      Logger.log(summary);
      alert(summary);
      
      setTimeout(() => this.progress.remove(), 3000);
    }
  }
  
  // Initialize and start
  Logger.log('🎯 UIT Smart Campus Registration Script Loaded');
  Logger.log(\`📋 Classes to register: \${CONFIG.classIds.length}\`);
  Logger.log(\`⚙️ Auto-submit: \${CONFIG.autoSubmit ? 'Enabled' : 'Disabled'}\`);
  
  const bot = new RegistrationBot();
  bot.start();
  
})();

// ===== END OF SCRIPT =====
// Generated by UIT Smart Campus 2024
// Enhanced by @HyIsNoob • Original by @loia5tqd001
`.trim();
};

interface ScriptOptions {
  autoSubmit: boolean;
  delayBetweenActions: number;
  maxRetries: number;
  enableLogging: boolean;
  confirmBeforeSubmit: boolean;
}

const ScriptDangKyInput: React.FC = () => {
  const selectedClasses = useTkbStore(selectSelectedClassesBuoc3);
  const [scriptOptions, setScriptOptions] = useState<ScriptOptions>({
    autoSubmit: false,
    delayBetweenActions: 500,
    maxRetries: 3,
    enableLogging: true,
    confirmBeforeSubmit: true,
  });
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter and deduplicate class IDs
  const classIds = React.useMemo(() => {
    if (!selectedClasses || selectedClasses.length === 0) return [];
    
    // Remove duplicates and filter out invalid entries
    const uniqueClasses = [...new Set(
      selectedClasses
        .map(item => item.MaLop)
        .filter(classId => classId && typeof classId === 'string' && classId.trim() !== '')
    )];
    
    return uniqueClasses;
  }, [selectedClasses]);

  const generateScript = useCallback(() => {
    if (classIds.length === 0) {
      enqueueSnackbar('Chưa có lớp nào được chọn', { variant: 'warning' });
      return;
    }

    // Warning for too many classes
    if (classIds.length > 50) {
      const proceed = window.confirm(
        `⚠️ CẢNH BÁO: Bạn đang tạo script cho ${classIds.length} lớp học!\n\n` +
        `Điều này có thể:\n` +
        `• Gây quá tải hệ thống đăng ký\n` +
        `• Làm tài khoản bị khóa tạm thời\n` +
        `• Mất rất nhiều thời gian xử lý\n\n` +
        `Bạn có chắc muốn tiếp tục?\n\n` +
        `Khuyến nghị: Chỉ nên đăng ký 5-20 lớp mỗi lần.`
      );
      
      if (!proceed) {
        enqueueSnackbar('Đã hủy tạo script', { variant: 'info' });
        return;
      }
    }

    const script = generateEnhancedScript(classIds, scriptOptions);
    setGeneratedScript(script);
    tracker.track('[page3] script_generated_clicked', {
      classCount: classIds.length,
      autoSubmit: scriptOptions.autoSubmit,
    });
  }, [classIds, scriptOptions]);

  const copyToClipboard = useCallback(async () => {
    if (!generatedScript) {
      generateScript();
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedScript);
      enqueueSnackbar('Script đã được copy vào clipboard!', { variant: 'success' });
      tracker.track('[page3] script_copy_clicked');
    } catch (error) {
      enqueueSnackbar('Lỗi khi copy script', { variant: 'error' });
    }
  }, [generatedScript, generateScript]);

  const downloadScript = useCallback(() => {
    if (!generatedScript) {
      generateScript();
      return;
    }

    const blob = new Blob([generatedScript], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uit-registration-script-${new Date().toISOString().split('T')[0]}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    tracker.track('[page3] script_download_clicked');
  }, [generatedScript, generateScript]);

  React.useEffect(() => {
    if (classIds.length > 0) {
      generateScript();
    }
  }, [classIds, generateScript]);

  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          height: '100%',
          background: colors.glass.background,
          backdropFilter: colors.glass.backdropFilter,
          border: colors.glass.border,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                mr: 2,
              }}
            >
              <CodeIcon sx={{ fontSize: 24, color: colors.neutral[50] }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: colors.neutral[800] }}>
                🚀 Script Đăng Ký Nâng Cao
              </Typography>
              <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                Enhanced by @HyIsNoob với auto-submit
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: colors.primary.main, fontWeight: 700 }}>
                    {classIds.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                    Lớp học
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: colors.success.main, fontWeight: 700 }}>
                    {scriptOptions.autoSubmit ? 'ON' : 'OFF'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                    Auto Submit
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: colors.warning.main, fontWeight: 700 }}>
                    {scriptOptions.delayBetweenActions}ms
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                    Delay
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Configuration */}
          <Accordion 
            expanded={isExpanded} 
            onChange={() => setIsExpanded(!isExpanded)}
            sx={{ 
              mb: 3, 
              background: alpha(colors.primary.main, 0.05),
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon sx={{ mr: 1, color: colors.primary.main }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Cấu hình nâng cao
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={scriptOptions.autoSubmit}
                        onChange={(e) => setScriptOptions(prev => ({ ...prev, autoSubmit: e.target.checked }))}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AutoAwesomeIcon sx={{ mr: 1, fontSize: 18 }} />
                        Tự động submit (Khuyến nghị: TẮT cho lần đầu)
                      </Box>
                    }
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={scriptOptions.confirmBeforeSubmit}
                        onChange={(e) => setScriptOptions(prev => ({ ...prev, confirmBeforeSubmit: e.target.checked }))}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SecurityIcon sx={{ mr: 1, fontSize: 18 }} />
                        Xác nhận trước khi submit
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={6}>
      <TextField
                    label="Delay (ms)"
                    type="number"
        size="small"
                    value={scriptOptions.delayBetweenActions}
                    onChange={(e) => setScriptOptions(prev => ({ 
                      ...prev, 
                      delayBetweenActions: parseInt(e.target.value) || 500 
                    }))}
        InputProps={{
                      startAdornment: <SpeedIcon sx={{ mr: 1, color: colors.neutral[500] }} />,
        }}
      />
    </Grid>

    <Grid item xs={6}>
      <TextField
                    label="Max Retries"
                    type="number"
        size="small"
                    value={scriptOptions.maxRetries}
                    onChange={(e) => setScriptOptions(prev => ({ 
                      ...prev, 
                      maxRetries: parseInt(e.target.value) || 3 
                    }))}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Warnings */}
          {classIds.length > 50 && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                background: alpha(colors.error.main, 0.1),
                border: `1px solid ${alpha(colors.error.main, 0.3)}`,
              }}
              icon={<WarningIcon />}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ⚠️ CẢNH BÁO: Quá nhiều lớp ({classIds.length} lớp)
              </Typography>
              <Typography variant="body2">
                Số lượng lớp quá lớn có thể gây quá tải hệ thống và làm tài khoản bị khóa.
                Khuyến nghị chỉ đăng ký 5-20 lớp mỗi lần.
              </Typography>
            </Alert>
          )}

          {classIds.length > 20 && classIds.length <= 50 && (
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 2,
                background: alpha(colors.warning.main, 0.1),
                border: `1px solid ${alpha(colors.warning.main, 0.3)}`,
              }}
              icon={<WarningIcon />}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ⚠️ Số lượng lớp nhiều ({classIds.length} lớp)
              </Typography>
              <Typography variant="body2">
                Hãy đảm bảo bạn thực sự cần đăng ký tất cả các lớp này.
              </Typography>
            </Alert>
          )}

          {scriptOptions.autoSubmit && (
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3,
                background: alpha(colors.warning.main, 0.1),
                border: `1px solid ${alpha(colors.warning.main, 0.3)}`,
              }}
              icon={<WarningIcon />}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Chế độ Auto-Submit đang BẬT
              </Typography>
              <Typography variant="body2">
                Script sẽ tự động submit sau khi chọn lớp. Hãy chắc chắn bạn đã kiểm tra kỹ!
              </Typography>
            </Alert>
          )}

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={copyToClipboard}
              startIcon={<CopyIcon />}
              disabled={classIds.length === 0}
              sx={{
                flex: 1,
                minWidth: 120,
                background: colors.gradients.primary,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 102, 204, 0.3)',
                },
              }}
            >
              Copy Script
            </Button>

            <Button
        variant="outlined"
              onClick={downloadScript}
              startIcon={<DownloadIcon />}
              disabled={classIds.length === 0}
              sx={{
                borderColor: colors.primary.main,
                color: colors.primary.main,
                '&:hover': {
                  borderColor: colors.primary.main,
                  background: alpha(colors.primary.main, 0.05),
                },
              }}
            >
              Download
            </Button>
          </Box>

          {/* Instructions */}
          <Box sx={{ mt: 3, p: 2, background: alpha(colors.success.main, 0.05), borderRadius: 2 }}>
            <Typography variant="body2" sx={{ color: colors.neutral[700], mb: 1, fontWeight: 600 }}>
              📋 Hướng dẫn sử dụng:
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[600], lineHeight: 1.6 }}>
              1. Copy script và mở trang đăng ký UIT<br/>
              2. Mở Developer Tools (F12) → Console<br/>
              3. Paste script và nhấn Enter<br/>
              4. Script sẽ tự động chọn lớp và hiển thị progress
            </Typography>
          </Box>

          {/* Features */}
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[
              { label: 'Auto Retry', color: colors.primary.main },
              { label: 'Progress UI', color: colors.secondary.main },
              { label: 'Error Handling', color: colors.warning.main },
              { label: 'Smart Logging', color: colors.success.main },
            ].map((feature, index) => (
              <Chip
                key={index}
                label={feature.label}
                size="small"
                sx={{
                  background: alpha(feature.color, 0.1),
                  color: feature.color,
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ScriptDangKyInput;
