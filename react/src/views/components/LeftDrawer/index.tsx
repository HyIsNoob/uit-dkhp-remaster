import FeedbackIcon from '@mui/icons-material/FeedbackOutlined';
import MenuIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import SchoolIcon from '@mui/icons-material/School';
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { IconButton, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { default as MuiDrawer } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import logoUit from 'assets/img/logo-uit.png';
import GitHubButton from 'react-github-btn';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useHotkeys } from 'react-hotkeys-hook';
import { tracker } from '../../..';
import { ROUTES } from '../../../constants';
import { useDrawerStore } from '../../../zus';
import { colors } from '../../../theme';

const drawerWidth = 190;
const drawerWidthClosed = 50;

const openCloseMixin = (theme) =>
  ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  } as const);

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...openCloseMixin(theme),
  '& .MuiDrawer-paper': {
    background: `linear-gradient(145deg, ${colors.background.paper} 0%, ${colors.background.secondary} 100%)`,
    backdropFilter: 'blur(20px)',
    borderRight: `1px solid ${colors.neutral[200]}`,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    ...openCloseMixin(theme),
    width: open ? drawerWidth : drawerWidthClosed,
  },
}));

// Route icons mapping
const routeIcons = {
  [ROUTES._1ChonFileExcel.path]: SchoolIcon,
  [ROUTES._2XepLop.path]: TableViewIcon,
  [ROUTES._3KetQua.path]: CalendarTodayIcon,
};

function LeftDrawer() {
  const toggleDrawer = useDrawerStore((s) => s.toggleDrawer);
  const isOpen = useDrawerStore((s) => s.isDrawerOpen);
  const isCollapsed = !isOpen;
  const location = useLocation();
  const history = useHistory();

  useHotkeys(['shift+`', 'alt+`'], () => toggleDrawer());
  useHotkeys(['shift+1', 'alt+1'], () => history.push(ROUTES._1ChonFileExcel.path));
  useHotkeys(['shift+2', 'alt+2'], () => history.push(ROUTES._2XepLop.path));
  useHotkeys(['shift+3', 'alt+3'], () => history.push(ROUTES._3KetQua.path));

  return (
    <nav>
      <Drawer variant="permanent" open={isOpen}>
        {/* Header with toggle button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 64,
            background: colors.gradients.primary,
            borderBottom: `1px solid ${colors.neutral[200]}`,
          }}
        >
          <Tooltip title={isOpen ? 'Thu gọn' : 'Mở rộng'}>
            <IconButton 
              onClick={toggleDrawer} 
              size="large"
              sx={{ 
                color: colors.neutral[50],
                transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Logo Section */}
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
            px: 2,
          }}
        >
          <Tooltip title="Tool đăng ký học phần UIT">
            <Box
              component="a"
              href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => tracker.track('[drawer] logo_clicked')}
              sx={{
                display: 'block',
                width: isOpen ? 80 : 40,
                height: isOpen ? 80 : 40,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 24px 0 rgba(0, 102, 204, 0.3)',
                },
              }}
            >
              <img
                src={logoUit}
                alt="UIT Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Tooltip>
          
          {isOpen && (
            <Typography
              variant="subtitle2"
              sx={{
                mt: 1,
                color: colors.neutral[700],
                fontWeight: 600,
                textAlign: 'center',
                fontSize: '0.75rem',
              }}
            >
              ĐKHP UIT
            </Typography>
          )}
        </Box>

        <Divider sx={{ mx: 2, backgroundColor: colors.neutral[200] }} />

        {/* Navigation Menu */}
        <List sx={{ px: 1, py: 2 }}>
          {Object.values(ROUTES).map((route, index) => {
            const IconComponent = routeIcons[route.path];
            const isActive = location.pathname === route.path;
            
            return (
              <ListItem
                key={route.path}
                component={NavLink}
                to={route.path + location.search}
                onClick={() => tracker.track('[drawer] menu_item_clicked', route)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  background: isActive ? colors.gradients.primary : 'transparent',
                  color: isActive ? colors.neutral[50] : colors.neutral[700],
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: isActive ? colors.gradients.primary : colors.neutral[100],
                    transform: 'translateX(4px)',
                  },
                  '&.active': {
                    background: colors.gradients.primary,
                    color: colors.neutral[50],
                  },
                }}
              >
                {IconComponent && (
                  <ListItemIcon
                    sx={{
                      color: 'inherit',
                      minWidth: isOpen ? 40 : 'auto',
                      mr: isOpen ? 1 : 0,
                    }}
                  >
                    <IconComponent fontSize="small" />
                  </ListItemIcon>
                )}
                
                {isOpen && (
                  <ListItemText 
                    primary={route.name}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                )}
                
                {!isOpen && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      right: 8,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </Typography>
                )}
              </ListItem>
            );
          })}
        </List>

        {/* Footer Section */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Divider sx={{ mb: 2, backgroundColor: colors.neutral[200] }} />
          
          {/* Feedback Button */}
          <Tooltip title="Gửi feedback" placement="top">
            <Box
              component="a"
              href="https://www.facebook.com/messages/t/loia5tqd001"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => tracker.track('[drawer] btn_feedback_clicked')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isOpen ? 'flex-start' : 'center',
                p: 1,
                borderRadius: 2,
                color: colors.primary[500],
                textDecoration: 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: colors.primary[50],
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <FeedbackIcon fontSize="small" />
              {isOpen && (
                <Typography
                  variant="body2"
                  sx={{ ml: 1, fontWeight: 500, fontSize: '0.875rem' }}
                >
                  Góp ý
                </Typography>
              )}
            </Box>
          </Tooltip>

          {/* Typewriter Effect */}
          {isOpen && (
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 24,
                color: colors.neutral[600],
                fontSize: '0.75rem',
              }}
            >
              <Typewriter
                options={{
                  strings: ['Góp ý', 'Chia sẻ', 'Đánh giá ⭐'],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </Box>
          )}

          {/* GitHub Star Button */}
          {isOpen && (
            <Tooltip title="Hãy star repo này nhé! 🌟">
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 1,
                  border: `2px dashed ${colors.primary[300]}`,
                  borderRadius: 2,
                  backgroundColor: colors.primary[50],
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: colors.primary[500],
                    backgroundColor: colors.primary[100],
                    transform: 'scale(1.02)',
                  },
                }}
                onClick={() => tracker.track('[drawer] btn_star_github_clicked')}
                onMouseEnter={() => tracker.track('[drawer] btn_star_github_hovered')}
              >
                <GitHubButton
                  href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
                  data-size="large"
                  data-show-count="true"
                  children={'Star'}
                />
              </Box>
            </Tooltip>
          )}
        </Box>
      </Drawer>
    </nav>
  );
}

export default LeftDrawer;
