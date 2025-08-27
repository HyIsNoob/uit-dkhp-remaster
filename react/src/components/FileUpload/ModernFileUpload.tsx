import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  IconButton,
  Fade,
  Slide,
  alpha,
  Divider,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  InsertDriveFile as ExcelIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import XLSX from 'xlsx';
import { colors } from '../../theme';
import { selectDataExcel, useTkbStore } from '../../zus';
import { ROUTES } from '../../constants';
import { tracker } from '../..';
import { arrayToTkbObject, toDateTimeString } from '../../views/1ChonFileExcel/utils';

interface ModernFileUploadProps {
  onFileSelect?: (file: File) => void;
  selectedFile?: File | null;
  uploadProgress?: number;
  isUploading?: boolean;
  error?: string | null;
  onClear?: () => void;
}

const FilePreviewCard = ({ 
  file, 
  onClear, 
  progress, 
  isUploading, 
  error,
  dataExcel 
}: {
  file?: File;
  onClear?: () => void;
  progress?: number;
  isUploading?: boolean;
  error?: string | null;
  dataExcel?: any;
}) => {
  const getFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = () => {
    if (error) return <ErrorIcon sx={{ color: colors.error.main }} />;
    if (isUploading) return <UploadIcon sx={{ color: colors.primary.main }} />;
    if (dataExcel?.lastUpdate) return <SuccessIcon sx={{ color: colors.success.main }} />;
    return <ExcelIcon sx={{ color: colors.primary.main }} />;
  };

  const getStatusColor = () => {
    if (error) return colors.error.main;
    if (isUploading) return colors.primary.main;
    if (dataExcel?.lastUpdate) return colors.success.main;
    return colors.primary.main;
  };

  const displayFile = file || (dataExcel?.fileName ? { name: dataExcel.fileName, size: 0 } : null);

  if (!displayFile) return null;

  return (
    <Slide direction="up" in timeout={500}>
      <Card
        sx={{
          background: colors.glass.background,
          backdropFilter: colors.glass.backdropFilter,
          border: `2px solid ${getStatusColor()}`,
          borderRadius: 3,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {onClear && (
          <IconButton
            onClick={onClear}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: colors.neutral[50],
              boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
              '&:hover': {
                background: colors.error.main,
                color: colors.neutral[50],
                transform: 'scale(1.1)',
              },
            }}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${alpha(getStatusColor(), 0.2)} 0%, ${alpha(getStatusColor(), 0.1)} 100%)`,
              }}
            >
              <ExcelIcon sx={{ fontSize: 32, color: getStatusColor() }} />
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {displayFile.name}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                {file ? getFileSize(file.size) : 'Excel file'} • {dataExcel?.lastUpdate || 'Chưa xử lý'}
              </Typography>
            </Box>

            {getStatusIcon()}
          </Box>

          {/* Progress bar */}
          {isUploading && typeof progress === 'number' && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                  Đang xử lý...
                </Typography>
                <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: alpha(colors.primary.main, 0.2),
                  '& .MuiLinearProgress-bar': {
                    background: colors.gradients.primary,
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          )}

          {/* Data info */}
          {dataExcel?.data && (
            <Box sx={{ mb: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: colors.primary.main, fontWeight: 700 }}>
                      {dataExcel.data.length}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                      Lớp học
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: colors.secondary.main, fontWeight: 700 }}>
                      {new Set(dataExcel.data.map(item => item.MaMH)).size}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                      Môn học
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Status message */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 2,
                borderRadius: 2,
                background: alpha(colors.error.main, 0.1),
                border: `1px solid ${alpha(colors.error.main, 0.3)}`,
              }}
            >
              {error}
            </Alert>
          )}

          {!error && !isUploading && dataExcel?.lastUpdate && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2,
                borderRadius: 2,
                background: alpha(colors.success.main, 0.1),
                border: `1px solid ${alpha(colors.success.main, 0.3)}`,
              }}
            >
              File đã được xử lý thành công! Tìm thấy {dataExcel.data?.length || 0} lớp học.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Slide>
  );
};

const ModernFileUpload: React.FC<ModernFileUploadProps> = ({
  onFileSelect,
  selectedFile,
  uploadProgress,
  isUploading,
  error,
  onClear,
}) => {
  const history = useHistory();
  const [isDragActive, setIsDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const dataExcel = useTkbStore(selectDataExcel);
  const setDataExcel = useTkbStore((s) => s.setDataExcel);

  const processExcelFile = useCallback((file: File) => {
    setProcessing(true);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    
    reader.onload = (e) => {
      try {
        const bstr = e?.target?.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
        const wsLyThuyet = wb.Sheets[wb.SheetNames[0]];
        const wsThucHanh = wb.Sheets[wb.SheetNames[1]];
        const dataLyThuyet = XLSX.utils.sheet_to_json<any[][]>(wsLyThuyet, { header: 1 });
        const dataThucHanh = XLSX.utils.sheet_to_json<any[][]>(wsThucHanh, { header: 1 });
        // Enhanced data filtering - more robust than just checking STT
        const dataInArray = [...dataLyThuyet, ...dataThucHanh].filter((row) => {
          // Check if row has valid data structure
          if (!Array.isArray(row) || row.length < 3) return false;
          
          // Check if STT is a valid number
          const stt = row[0];
          if (typeof stt !== 'number' || isNaN(stt) || stt <= 0) return false;
          
          // Check if MaMH and MaLop exist
          const maMH = row[1];
          const maLop = row[2];
          if (!maMH || !maLop || String(maMH).trim() === '' || String(maLop).trim() === '') return false;
          
          return true;
        });
        
        if (dataInArray.length) {
          setDataExcel({
            data: dataInArray.map((array) => arrayToTkbObject(array)),
            fileName: file.name,
            lastUpdate: toDateTimeString(new Date()),
          });
          
          enqueueSnackbar(`Upload thành công ${file.name} - Tự động chuyển sang trang xếp lịch sau 1.5s`, {
            variant: 'success',
            autoHideDuration: 3000,
          });
          
          tracker.track('[page1] upload_excel_resulted', { success: true, fileName: file.name });
          
          // Auto-navigate to scheduling page after successful upload
          setTimeout(() => {
            history.push(ROUTES._2XepLop.path);
          }, 1500);
        } else {
          enqueueSnackbar('Không đúng định dạng file của trường', {
            variant: 'error',
          });
          tracker.track('[page1] upload_excel_resulted', { success: false });
        }
      } catch (err) {
        enqueueSnackbar('Lỗi khi xử lý file Excel', {
          variant: 'error',
        });
        tracker.track('[page1] upload_excel_resulted', { success: false, error: (err as Error).message });
      } finally {
        setProcessing(false);
      }
    };
    
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }, [setDataExcel]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelect?.(file);
      processExcelFile(file);
    }
  }, [onFileSelect, processExcelFile]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  const handleClear = () => {
    setDataExcel(null);
    onClear?.();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={4}>
        {/* Upload Zone */}
        <Grid item xs={12} md={dataExcel?.lastUpdate ? 6 : 12}>
          <Fade in timeout={600}>
            <Card
              {...getRootProps()}
              sx={{
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: 4,
                border: `2px dashed ${isDragActive ? colors.primary.main : alpha(colors.neutral[300], 0.5)}`,
                background: isDragActive 
                  ? alpha(colors.primary.main, 0.05)
                  : alpha(colors.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
                '&:hover': {
                  borderColor: colors.primary.main,
                  background: alpha(colors.primary.main, 0.02),
                  transform: 'scale(1.01)',
                },
              }}
            >
              <input {...getInputProps()} />
              
              <Box
                sx={{
                  p: 3,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  transform: isDragActive ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <UploadIcon sx={{ fontSize: 40, color: colors.neutral[50] }} />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: isDragActive ? colors.primary.main : colors.neutral[800],
                }}
              >
                {isDragActive ? 'Thả file vào đây' : 'Tải lên file Excel'}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: colors.neutral[600],
                  lineHeight: 1.6,
                }}
              >
                Kéo thả file vào đây hoặc nhấn để chọn file
                <br />
                <Typography component="span" variant="body2" sx={{ color: colors.neutral[500] }}>
                  Hỗ trợ: .xlsx, .xls (tối đa 10MB)
                </Typography>
              </Typography>

              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                  tracker.track('[page1] btn_upload_excel_clicked');
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: colors.gradients.primary,
                  boxShadow: '0 8px 24px 0 rgba(0, 102, 204, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px 0 rgba(0, 102, 204, 0.4)',
                  },
                }}
                startIcon={<UploadIcon />}
              >
                Chọn file Excel
              </Button>

              {/* Supported formats */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {['.xlsx', '.xls'].map((format) => (
                  <Chip
                    key={format}
                    label={format}
                    size="small"
                    sx={{
                      backgroundColor: alpha(colors.primary.main, 0.1),
                      color: colors.primary.main,
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Fade>
        </Grid>

        {/* File Preview */}
        {(selectedFile || dataExcel?.lastUpdate) && (
          <Grid item xs={12} md={6}>
            <FilePreviewCard
              file={selectedFile || undefined}
              onClear={handleClear}
              progress={uploadProgress}
              isUploading={processing || isUploading}
              error={error}
              dataExcel={dataExcel}
            />
          </Grid>
        )}
      </Grid>

      {/* Sample Files Section */}
      <Fade in timeout={800} style={{ transitionDelay: '200ms' }}>
        <Card
          sx={{
            mt: 4,
            p: 3,
            background: alpha(colors.primary.main, 0.02),
            border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: colors.primary.main }}>
            📋 File Excel mẫu
          </Typography>
          
          <Typography variant="body2" sx={{ color: colors.neutral[700], mb: 2 }}>
            Tải file Excel mẫu để test hoặc tham khảo định dạng:
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              component="a"
              href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRyf8-kMRTo4CllfPA4sjbjxkhGhR1tT7yD1HASjmClqTwwkJBgWRvuxJPIAK8Wdw/pub?output=xlsx"
              target="_blank"
              onClick={() => {
                tracker.track('[page1] link_excel_hk2_2023_2024_clicked');
              }}
              sx={{
                textTransform: 'none',
                borderColor: alpha(colors.primary.main, 0.3),
                color: colors.primary.main,
                '&:hover': {
                  borderColor: colors.primary.main,
                  background: alpha(colors.primary.main, 0.05),
                },
              }}
            >
              TKB HK2 2023-2024
            </Button>
            
            <Button
              variant="text"
              size="small"
              startIcon={<ExcelIcon />}
              component="a"
              href="https://daa.uit.edu.vn/thong-bao-lich-dkhp-va-tkb-du-kien-hk2-nam-hoc-2023-2024"
              target="_blank"
              onClick={() => {
                tracker.track('[page1] link_excel_hk2_2023_2024_original_clicked');
              }}
              sx={{
                textTransform: 'none',
                color: colors.neutral[600],
                '&:hover': {
                  color: colors.primary.main,
                  background: alpha(colors.primary.main, 0.05),
                },
              }}
            >
              Xem thông báo gốc
            </Button>
          </Box>
        </Card>
      </Fade>
    </Box>
  );
};

export default ModernFileUpload; 