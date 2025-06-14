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
  FormControlLabel,
  Checkbox,
  Tooltip,
  Paper,

} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Code as CodeIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { tracker } from '../..';
import SoTinChi from '../components/SoTinChi';
import ThoiKhoaBieuTable from '../components/ThoiKhoaBieuTable';
import { selectIsChiVeTkb, selectTongSoTcBuoc3, useTkbStore } from '../../zus';
import ScriptDangKyInput from './ScriptDangKyInput';
import DanhSachLopInput from './DanhSachLopInput';
import AnalyticsDashboard from '../../components/Analytics/AnalyticsDashboard';
import { colors } from '../../theme';

// Header section for the results page
const ResultsHeader = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(colors.success.main, 0.08)} 0%, ${alpha(colors.primary.main, 0.08)} 100%)`,
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
                  background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.primary.main} 100%)`,
                  mr: 2,
                }}
              >
                <AssignmentIcon sx={{ fontSize: 32, color: colors.neutral[50] }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.primary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Kết Quả & Script
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
                icon={<ScheduleIcon />}
                label="Thời khóa biểu"
                sx={{
                  background: alpha(colors.success.main, 0.1),
                  color: colors.success.main,
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<CodeIcon />}
                label="Auto Script"
                sx={{
                  background: alpha(colors.primary.main, 0.1),
                  color: colors.primary.main,
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<CheckCircleIcon />}
                label="Ready to Register"
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
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: colors.success.main }}>
                  🎉 Hoàn thành!
                </Typography>
                <Typography variant="body2" sx={{ color: colors.neutral[600], lineHeight: 1.6 }}>
                  Thời khóa biểu đã được tối ưu hóa. 
                  Sử dụng script để đăng ký nhanh chóng.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Control panel component
const ControlPanel = () => {
  const setIsChiVeTkb = useTkbStore((s) => s.setIsChiVeTkb);
  const khongXepLop = useTkbStore(selectIsChiVeTkb);
  const tongSoTC = useTkbStore(selectTongSoTcBuoc3);

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        background: colors.glass.background,
        backdropFilter: colors.glass.backdropFilter,
        border: colors.glass.border,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <InfoIcon sx={{ color: colors.primary.main }} />
            <Tooltip
              title={
                window.location.search.includes('self_selected')
                  ? 'Đang dùng tính năng chia sẻ TKB ?self_selected='
                  : 'Tick chọn khi bạn không dùng chức năng Xếp Lớp ở Bước 2 và nhập danh sách lớp tự chuẩn bị'
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={khongXepLop}
                    onChange={(e) => {
                      setIsChiVeTkb(e.target.checked);
                      tracker.track('[page3] checkbox_chi_ve_tkb_toggled', {
                        newState: e.target.checked,
                      });
                    }}
                    name="chiVeTkb"
                    color="primary"
                    size="small"
                  />
                }
                sx={{
                  opacity: !khongXepLop ? 0.7 : 1,
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    color: colors.neutral[700],
                  },
                }}
                label="Tự chuẩn bị danh sách mã lớp"
              />
            </Tooltip>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SoTinChi tongSoTcSelected={tongSoTC} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

function Index() {
  return (
    <Box sx={{ minHeight: '100vh', background: colors.background.default }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <ResultsHeader />
        <ControlPanel />
        
        {/* Script and Input Section */}
        <Card
          sx={{
            mb: 3,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: `1px solid ${alpha(colors.neutral[200], 0.2)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: colors.primary.main }}>
              📝 Cấu hình & Script
            </Typography>
            <Grid container spacing={3}>
              <DanhSachLopInput />
              <ScriptDangKyInput />
            </Grid>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <Card
          sx={{
            mb: 3,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: `1px solid ${alpha(colors.neutral[200], 0.2)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <AnalyticsDashboard />
          </CardContent>
        </Card>

        {/* Timetable Section */}
        <Card
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: `1px solid ${alpha(colors.neutral[200], 0.2)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: colors.primary.main }}>
              📅 Thời Khóa Biểu Cuối Cùng
            </Typography>
            <Box sx={{ overflow: 'auto' }}>
              <ThoiKhoaBieuTable />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Index;
