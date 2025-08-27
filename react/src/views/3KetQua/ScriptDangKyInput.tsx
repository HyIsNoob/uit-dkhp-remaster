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

// Optimized script based on CaiTien-Deep.txt for maximum speed and accuracy
const generateOptimizedScript = (classIds: string[]) => {
  return `
// ===== UIT SMART CAMPUS - OPTIMIZED REGISTRATION SCRIPT =====
// Based on CaiTien-Deep.txt - Optimized for speed and accuracy
// Version: 2024.2.0 - Ultra Fast Registration
// ========================================================

var monDangKy = "${classIds.join(',')}";
var classCodes = monDangKy.split(",");

function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function handleSearch(rows) {
  function findClassCode(classCode) {
    for (let row of rows) {
      var checkbox = row.getElementsByTagName("input")[0];
      var cells = row.getElementsByTagName("td");
      if (cells[1].innerHTML == classCode) {
        checkbox.click();
        console.log("Đã tìm thấy và check: " + cells[1].innerHTML);
        break;
      }
    }
  }
  for (let i = 0; i < classCodes.length; i++) {
    findClassCode(classCodes[i]);
  }
}

waitForElement("tbody > tr").then((element) => {
  var table = document.getElementsByTagName("tbody")[0];
  var rows = table.getElementsByTagName("tr");
  handleSearch(rows);
  waitForElement(".detailBar button.chakra-button, input[type='submit'][value*='Đăng'], button[type='submit'], .btn-submit, #submit-btn").then((element) => {
    element.click();
  });
  return "Done";
});
`.trim();
};

interface ScriptOptions {
  autoSubmit: boolean;
  enableLogging: boolean;
}

const ScriptDangKyInput: React.FC = () => {
  const selectedClasses = useTkbStore(selectSelectedClassesBuoc3);
  const [scriptOptions, setScriptOptions] = useState<ScriptOptions>({
    autoSubmit: true,
    enableLogging: true,
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

    const script = generateOptimizedScript(classIds);
    setGeneratedScript(script);
    tracker.track('[page3] script_generated_clicked', {
      classCount: classIds.length,
      autoSubmit: scriptOptions.autoSubmit,
    });
  }, [classIds, scriptOptions.autoSubmit]);

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
    
    enqueueSnackbar('Script đã được tải xuống!', { variant: 'success' });
    tracker.track('[page3] script_download_clicked');
  }, [generatedScript, generateScript]);

  return (
    <Card
      sx={{
        background: colors.glass.background,
        backdropFilter: colors.glass.backdropFilter,
        border: colors.glass.border,
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
              mr: 2,
            }}
          >
            <CodeIcon sx={{ fontSize: 24, color: colors.neutral[50] }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: colors.neutral[800] }}>
            Script Đăng Ký Tối Ưu
          </Typography>
          <Chip
            icon={<SpeedIcon />}
            label="Ultra Fast"
            size="small"
            sx={{
              ml: 2,
              background: alpha(colors.success.main, 0.1),
              color: colors.success.main,
              fontWeight: 500,
            }}
          />
        </Box>

        {/* Script Options */}
        <Accordion
          expanded={isExpanded}
          onChange={() => setIsExpanded(!isExpanded)}
          sx={{
            mb: 3,
            background: alpha(colors.neutral[50], 0.5),
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SettingsIcon sx={{ mr: 1, color: colors.primary.main }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Tùy chỉnh Script
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={scriptOptions.autoSubmit}
                      onChange={(e) => setScriptOptions(prev => ({ ...prev, autoSubmit: e.target.checked }))}
                      color="primary"
                    />
                  }
                  label="Tự động submit sau khi chọn lớp"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={scriptOptions.enableLogging}
                      onChange={(e) => setScriptOptions(prev => ({ ...prev, enableLogging: e.target.checked }))}
                      color="primary"
                    />
                  }
                  label="Hiển thị log chi tiết"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Class Count Info */}
        <Alert
          severity={classIds.length > 0 ? "info" : "warning"}
          sx={{ mb: 3, borderRadius: 2 }}
          icon={<AutoAwesomeIcon />}
        >
          {classIds.length > 0 
            ? `Đã sẵn sàng tạo script cho ${classIds.length} lớp học`
            : "Chưa có lớp nào được chọn. Vui lòng quay lại trang xếp lịch để chọn lớp."
          }
        </Alert>

        {/* Script Actions */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<CodeIcon />}
            onClick={generateScript}
            disabled={classIds.length === 0}
            sx={{
              background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
              color: colors.neutral[50],
              fontWeight: 600,
            }}
          >
            Tạo Script
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<CopyIcon />}
            onClick={copyToClipboard}
            disabled={!generatedScript}
            sx={{
              borderColor: colors.primary.main,
              color: colors.primary.main,
              '&:hover': {
                borderColor: colors.primary[600],
                background: alpha(colors.primary.main, 0.05),
              },
            }}
          >
            Copy Script
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={downloadScript}
            disabled={!generatedScript}
            sx={{
              borderColor: colors.success.main,
              color: colors.success.main,
              '&:hover': {
                borderColor: colors.success[600],
                background: alpha(colors.success.main, 0.05),
              },
            }}
          >
            Tải Xuống
          </Button>
        </Box>

        {/* Generated Script */}
        {generatedScript && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.neutral[700] }}>
              Script đã tạo:
            </Typography>
            <TextField
              multiline
              rows={12}
              fullWidth
              value={generatedScript}
              variant="outlined"
              InputProps={{
                readOnly: true,
                sx: {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  background: colors.neutral[50],
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        )}

        {/* Instructions */}
        <Alert
          severity="info"
          sx={{ mt: 3, borderRadius: 2 }}
          icon={<SecurityIcon />}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            📋 Hướng dẫn sử dụng:
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontSize: '0.875rem' }}>
            1. Copy script và mở trang đăng ký học phần UIT<br/>
            2. Mở Developer Tools (F12) → Console<br/>
            3. Paste script và nhấn Enter<br/>
            4. Script sẽ tự động chọn lớp và submit
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ScriptDangKyInput;
