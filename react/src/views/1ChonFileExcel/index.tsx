import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  alpha,
  Alert,
  AlertProps,
  Link,
  Paper
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  VideoLibrary as VideoIcon,
  Help as HelpIcon,
  Star as StarIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';
import { tracker } from '../..';
import { selectDataExcel, useTkbStore } from '../../zus';
import ModernFileUpload from '../../components/FileUpload/ModernFileUpload';
import { colors } from '../../theme';

// Header section for the upload page
const UploadHeader = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(colors.primary.main, 0.08)} 0%, ${alpha(colors.secondary.main, 0.08)} 100%)`,
        py: 4,
        mb: 3,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                  mr: 2,
                }}
              >
                <UploadIcon sx={{ fontSize: 32, color: colors.neutral[50] }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Upload File Excel
              </Typography>
            </Box>
            
            <Typography
              variant="h6"
              sx={{
                color: colors.neutral[600],
                mb: 2,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Tải lên file danh sách môn học để bắt đầu quá trình xếp lịch
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<UploadIcon />}
                label="Excel Import"
                sx={{
                  background: alpha(colors.primary.main, 0.1),
                  color: colors.primary.main,
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<VideoIcon />}
                label="Video Guide"
                sx={{
                  background: alpha(colors.secondary.main, 0.1),
                  color: colors.secondary.main,
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<HelpIcon />}
                label="FAQ Support"
                sx={{
                  background: alpha(colors.warning.main, 0.1),
                  color: colors.warning.main,
                  fontWeight: 500,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: colors.glass.background,
                backdropFilter: colors.glass.backdropFilter,
                border: colors.glass.border,
                borderRadius: 3,
                textAlign: 'center',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: colors.primary.main }}>
                  🚀 Bước đầu tiên
                </Typography>
                <Typography variant="body2" sx={{ color: colors.neutral[600], lineHeight: 1.6 }}>
                  Upload file Excel chứa danh sách môn học 
                  từ trang đăng ký UIT để bắt đầu.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Enhanced Alert component
function MyAlert({ children, color, ...otherProps }: AlertProps) {
  const dataExcel = useTkbStore(selectDataExcel);
  const finalColor = color ?? (dataExcel?.lastUpdate ? 'success' : 'info');
  return (
    <Alert
      severity="info"
      color={finalColor}
      sx={{
        fontWeight: 500,
        p: 2,
        mb: 2,
        borderRadius: 2,
        background: alpha(colors.primary.main, 0.05),
        border: `1px solid ${alpha(colors.primary.main, 0.2)}`,
        '& .MuiAlert-icon': {
          color: colors.primary.main,
        },
      }}
      variant="outlined"
      {...otherProps}
    >
      {children}
    </Alert>
  );
}

// Help and Resources section
const HelpSection = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            height: '100%',
            background: colors.glass.background,
            backdropFilter: colors.glass.backdropFilter,
            border: colors.glass.border,
            borderRadius: 3,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          }}
        >
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <VideoIcon sx={{ fontSize: 48, color: colors.secondary.main, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: colors.neutral[800] }}>
              Video Hướng Dẫn
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[600], mb: 3, lineHeight: 1.6 }}>
              Xem video chi tiết cách sử dụng script đăng ký nhanh
            </Typography>
            <Link
              href="https://www.youtube.com/watch?v=DsLUHgX_xzs"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                tracker.track('[page1] link_script_instruction_video_clicked');
              }}
              sx={{
                color: colors.secondary.main,
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Xem ngay →
            </Link>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card
          sx={{
            height: '100%',
            background: colors.glass.background,
            backdropFilter: colors.glass.backdropFilter,
            border: colors.glass.border,
            borderRadius: 3,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          }}
        >
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <HelpIcon sx={{ fontSize: 48, color: colors.warning.main, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: colors.neutral[800] }}>
              Câu Hỏi Thường Gặp
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[600], mb: 3, lineHeight: 1.6 }}>
              Tìm câu trả lời cho các vấn đề phổ biến khi sử dụng
            </Typography>
            <Link
              href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT/issues/21"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                tracker.track('[page1] link_faq_clicked');
              }}
              sx={{
                color: colors.warning.main,
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Xem ngay →
            </Link>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card
          sx={{
            height: '100%',
            background: colors.glass.background,
            backdropFilter: colors.glass.backdropFilter,
            border: colors.glass.border,
            borderRadius: 3,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          }}
        >
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <GitHubIcon sx={{ fontSize: 48, color: colors.success.main, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: colors.neutral[800] }}>
              Ủng Hộ Dự Án
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[600], mb: 3, lineHeight: 1.6 }}>
              Cảm thấy phần mềm hữu ích? Hãy thả star cho dự án!
            </Typography>
            <Link
              href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                tracker.track('[page1] link_tha_star_ngay_clicked');
              }}
              sx={{
                color: colors.success.main,
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Thả <StarIcon sx={{ fontSize: 16 }} /> star →
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

function Index() {
  return (
    <Box sx={{ minHeight: '100vh', background: colors.background.default }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <UploadHeader />
        
        {/* Upload Section */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: `1px solid ${alpha(colors.neutral[200], 0.2)}`,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: colors.primary.main }}>
              📁 Chọn File Excel
            </Typography>
            <ModernFileUpload />
          </CardContent>
        </Card>

        {/* Help and Resources */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: colors.neutral[800] }}>
            📚 Hướng Dẫn & Hỗ Trợ
          </Typography>
          <HelpSection />
        </Box>
      </Container>
    </Box>
  );
}

export default Index;
