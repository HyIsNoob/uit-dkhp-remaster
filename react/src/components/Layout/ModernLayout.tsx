import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  alpha,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Upload as UploadIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  GitHub as GitHubIcon,
  AccountCircle as AccountIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { colors } from '../../theme';
import { ROUTES } from '../../constants';
import { tracker } from '../..';

interface ModernLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const TopNavigation = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigationItems = [
    {
      path: ROUTES._1ChonFileExcel.path,
      name: 'Upload',
      icon: <UploadIcon fontSize="small" />,
    },
    {
      path: ROUTES._2XepLop.path,
      name: 'Xếp lịch',
      icon: <ScheduleIcon fontSize="small" />,
    },
    {
      path: ROUTES._3KetQua.path,
      name: 'Kết quả',
      icon: <AssignmentIcon fontSize="small" />,
    },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: alpha(colors.background.paper, 0.8),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(colors.neutral[200], 0.5)}`,
        color: colors.neutral[800],
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            mr: 4,
          }}
          onClick={() => tracker.track('[page] logo_clicked')}
        >
          <SchoolIcon 
            sx={{ 
              fontSize: 32, 
              color: colors.primary.main,
              mr: 1,
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            UIT Smart Campus
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: 1, mr: 'auto' }}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path + location.search}
                startIcon={item.icon}
                onClick={() => tracker.track('[page] menu_clicked')}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? colors.primary.main : colors.neutral[600],
                  background: isActive ? alpha(colors.primary.main, 0.1) : 'transparent',
                  '&:hover': {
                    background: alpha(colors.primary.main, 0.08),
                    color: colors.primary.main,
                  },
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            component="a"
            href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
            target="_blank"
            onClick={() => tracker.track('[page] github_clicked')}
            sx={{
              color: colors.neutral[600],
              '&:hover': {
                color: colors.primary.main,
                transform: 'scale(1.05)',
              },
            }}
          >
            <GitHubIcon />
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              color: colors.neutral[600],
              '&:hover': {
                color: colors.primary.main,
              },
            }}
          >
            <AccountIcon />
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              background: colors.glass.background,
              backdropFilter: colors.glass.backdropFilter,
              border: colors.glass.border,
              borderRadius: 2,
              minWidth: 200,
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: colors.primary.main }}>
                U
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  UIT Student
                </Typography>
                <Typography variant="caption" sx={{ color: colors.neutral[500] }}>
                  student@uit.edu.vn
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const BreadcrumbNavigation = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = [
      { name: 'Trang chủ', path: '/', icon: <HomeIcon fontSize="small" /> },
    ];

    Object.values(ROUTES).forEach((route) => {
      if (location.pathname === route.path) {
        const icon = getRouteIcon(route.path);
        if (icon) {
          paths.push({
            name: route.name,
            path: route.path,
            icon: icon,
          });
        }
      }
    });

    return paths;
  };

  const getRouteIcon = (path: string): React.ReactElement | null => {
    switch (path) {
      case ROUTES._1ChonFileExcel.path:
        return <UploadIcon fontSize="small" />;
      case ROUTES._2XepLop.path:
        return <ScheduleIcon fontSize="small" />;
      case ROUTES._3KetQua.path:
        return <AssignmentIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: colors.neutral[400] }} />}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
          },
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return isLast ? (
            <Chip
              key={breadcrumb.path}
              icon={breadcrumb.icon}
              label={breadcrumb.name}
              size="small"
              sx={{
                background: colors.gradients.primary,
                color: colors.neutral[50],
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: colors.neutral[50],
                },
              }}
            />
          ) : (
            <Link
              key={breadcrumb.path}
              component={RouterLink}
              to={breadcrumb.path}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: colors.neutral[600],
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: colors.primary.main,
                },
              }}
            >
              {breadcrumb.icon}
              {breadcrumb.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
};

// Footer component with credits
const FooterCredits = () => {
  return (
    <Box
      sx={{
        mt: 'auto',
        py: 3,
        px: 3,
        background: alpha(colors.neutral[50], 0.5),
        borderTop: `1px solid ${alpha(colors.neutral[200], 0.3)}`,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ color: colors.neutral[600], mb: 1 }}>
        © 2024 UIT Smart Campus - Enhanced version with modern UI/UX design
      </Typography>
              <Typography variant="body2" sx={{ color: colors.neutral[500] }}>
          Chỉnh sửa từ dự án gốc của{' '}
          <Link
            href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
            target="_blank"
            sx={{ 
              color: colors.primary.main,
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            @loia5tqd001
          </Link>
          {' '}• Enhanced by{' '}
          <Link
            href="https://github.com/HyIsNoob"
            target="_blank"
            sx={{ 
              color: colors.secondary.main,
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            @HyIsNoob
          </Link>
          {' '}with ❤️
        </Typography>
    </Box>
  );
};

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  action 
}) => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: colors.background.default,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopNavigation />
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: 2 
        }}
      >
        <BreadcrumbNavigation />
        
        {(title || subtitle || action) && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              {title && (
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: colors.neutral[800],
                  }}
                >
                  {title}
                </Typography>
              )}
              {action}
            </Box>
            {subtitle && (
              <Typography 
                variant="body1" 
                sx={{ 
                  color: colors.neutral[600],
                  lineHeight: 1.6,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        
        <Box sx={{ flex: 1 }}>
          {children}
        </Box>
      </Container>

      <FooterCredits />
    </Box>
  );
};

export default ModernLayout; 