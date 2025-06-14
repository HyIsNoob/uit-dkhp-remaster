import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { colors } from '../../theme';
import { selectFinalDataTkb, useTkbStore } from '../../zus';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
}) => {
  return (
    <Card
      sx={{
        background: colors.glass.background,
        backdropFilter: colors.glass.backdropFilter,
        border: colors.glass.border,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
          borderRadius: '50%',
          transform: 'translate(30px, -30px)',
        }}
      />

      <CardContent sx={{ p: 3, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              color: colors.neutral[50],
            }}
          >
            {icon}
          </Box>
          
          {trend && (
            <Chip
              label={`${trend.isPositive ? '+' : ''}${trend.value}%`}
              size="small"
              sx={{
                background: trend.isPositive 
                  ? alpha(colors.success.main, 0.1) 
                  : alpha(colors.error.main, 0.1),
                color: trend.isPositive ? colors.success.main : colors.error.main,
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: colors.neutral[800],
            mb: 0.5,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: colors.neutral[700],
            mb: subtitle ? 0.5 : 0,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: colors.neutral[500],
              fontSize: '0.875rem',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const AnalyticsDashboard: React.FC = () => {
  const finalDataTkb = useTkbStore(selectFinalDataTkb);

  const analytics = useMemo(() => {
    if (!finalDataTkb || finalDataTkb.length === 0) {
      return {
        totalClasses: 0,
        totalCredits: 0,
        totalSubjects: 0,
        averageCreditsPerSubject: 0,
      };
    }

    // Basic stats
    const totalClasses = finalDataTkb.length;
    const totalCredits = finalDataTkb.reduce((sum, item) => sum + (item.SoTc || 0), 0);
    const uniqueSubjects = new Set(finalDataTkb.map(item => item.MaMH));
    const totalSubjects = uniqueSubjects.size;
    const averageCreditsPerSubject = totalSubjects > 0 ? totalCredits / totalSubjects : 0;

    return {
      totalClasses,
      totalCredits,
      totalSubjects,
      averageCreditsPerSubject,
    };
  }, [finalDataTkb]);

  if (finalDataTkb.length === 0) {
    return (
      <Card
        sx={{
          background: colors.glass.background,
          backdropFilter: colors.glass.backdropFilter,
          border: colors.glass.border,
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
        }}
      >
        <AssessmentIcon sx={{ fontSize: 64, color: colors.neutral[400], mb: 2 }} />
        <Typography variant="h6" sx={{ color: colors.neutral[600], mb: 1 }}>
          Chưa có dữ liệu để phân tích
        </Typography>
        <Typography variant="body2" sx={{ color: colors.neutral[500] }}>
          Hãy chọn các lớp học để xem thống kê chi tiết
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: colors.neutral[800],
            mb: 1,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
          }}
        >
          📊 Analytics Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: colors.neutral[600] }}>
          Phân tích chi tiết về thời khóa biểu của bạn
        </Typography>
      </Box>

      {/* Main Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Tổng số lớp"
            value={analytics.totalClasses}
            subtitle="Lớp học đã chọn"
            icon={<SchoolIcon />}
            color={colors.primary.main}
            trend={{ value: 12, isPositive: true }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Tổng tín chỉ"
            value={analytics.totalCredits}
            subtitle={`Trung bình ${analytics.averageCreditsPerSubject.toFixed(1)} TC/môn`}
            icon={<StarIcon />}
            color={colors.secondary.main}
            trend={{ value: 8, isPositive: true }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Số môn học"
            value={analytics.totalSubjects}
            subtitle="Môn học khác nhau"
            icon={<CalendarIcon />}
            color={colors.success.main}
            trend={{ value: 5, isPositive: true }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Workload"
            value={`${Math.min(100, (analytics.totalCredits / 25) * 100).toFixed(0)}%`}
            subtitle={analytics.totalCredits > 20 ? 'Cao' : analytics.totalCredits > 15 ? 'Vừa phải' : 'Nhẹ'}
            icon={<SpeedIcon />}
            color={analytics.totalCredits > 20 ? colors.error.main : analytics.totalCredits > 15 ? colors.warning.main : colors.success.main}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard; 