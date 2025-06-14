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
  useTheme
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  ViewList as ViewListIcon,
  Analytics as AnalyticsIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';
import AgGrid from './AgGrid';
import TrungTkbDialog, { TrungTkbDialogContext } from './TrungTkbDialog';
import { colors } from '../../theme';

// Header section for the schedule page
const ScheduleHeader = () => {
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
                <ScheduleIcon sx={{ fontSize: 32, color: colors.neutral[50] }} />
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
                Xếp Lịch Thông Minh
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
              Xem thời khóa biểu cuối cùng và tải script tự động đăng ký
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<ViewListIcon />}
                label="Danh sách lớp"
                sx={{
                  background: alpha(colors.primary.main, 0.1),
                  color: colors.primary.main,
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<AnalyticsIcon />}
                label="Phân tích xung đột"
                sx={{
                  background: alpha(colors.secondary.main, 0.1),
                  color: colors.secondary.main,
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<AutoAwesomeIcon />}
                label="AI Optimization"
                sx={{
                  background: alpha(colors.success.main, 0.1),
                  color: colors.success.main,
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
                  🎯 Mục tiêu
                </Typography>
                <Typography variant="body2" sx={{ color: colors.neutral[600], lineHeight: 1.6 }}>
                  Tối ưu hóa thời khóa biểu với thuật toán thông minh, 
                  tránh xung đột và tạo lịch học hợp lý nhất.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Main component with modern styling
function Index(props) {
  return (
    <Box sx={{ minHeight: '100vh', background: colors.background.default }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <ScheduleHeader />
        
        <Card
          sx={{
            background: colors.background.paper,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: `1px solid ${alpha(colors.neutral[200], 0.2)}`,
          }}
        >
          <TrungTkbDialogContext>
            <Box sx={{ position: 'relative' }}>
              <AgGrid />
              <TrungTkbDialog />
            </Box>
          </TrungTkbDialogContext>
        </Card>
      </Container>
    </Box>
  );
}

export default Index;
