import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  IconButton,
  Fade,
  Slide,
  alpha,
  Chip,
  Divider,
  Link
} from '@mui/material';
import {
  Upload as UploadIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  School as SchoolIcon,
  KeyboardArrowRight as ArrowIcon,
  GitHub as GitHubIcon,
  Speed as SpeedIcon,
  People as PeopleIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Code as CodeIcon,
  AutoAwesome as AutoAwesomeIcon,
  Rocket as RocketIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { colors } from '../../theme';
import { ROUTES } from '../../constants';
import { tracker } from '../..';

// Animated particles background with brighter colors
const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number, color: string}>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const particleColors = [
        colors.primary.main,
        colors.secondary.main,
        '#FFD700', // Gold
        '#FF6B6B', // Coral
        '#4ECDC4', // Turquoise
        '#45B7D1', // Sky blue
        '#96CEB4', // Mint
        '#FFEAA7', // Light yellow
      ];
      
      const newParticles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${particle.color}, ${alpha(particle.color, 0.6)})`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${alpha(particle.color, 0.3)}`,
            animation: 'float 8s ease-in-out infinite',
            animationDelay: `${particle.id * 0.1}s`,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
              '33%': { transform: 'translateY(-30px) rotate(120deg)' },
              '66%': { transform: 'translateY(-15px) rotate(240deg)' },
            },
          }}
        />
      ))}
    </Box>
  );
};

// Hero section with vibrant colors
const HeroSection = () => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, 
          #667eea 0%, 
          #764ba2 25%, 
          #f093fb 50%, 
          #f5576c 75%, 
          #4facfe 100%)`,
        overflow: 'hidden',
      }}
    >
      <ParticlesBackground />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Fade in={isVisible} timeout={1000}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', md: '4.5rem', lg: '6rem' },
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 50%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    lineHeight: 1.1,
                    textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  UIT Smart
                  <br />
                  <Box 
                    component="span" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Campus 2024
                  </Box>
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    mb: 4,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  🚀 Hệ thống đăng ký học phần thông minh với AI-powered scheduling, 
                  real-time collaboration và trải nghiệm người dùng tuyệt vời.
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      tracker.track('[page] start_clicked');
                      history.push(ROUTES._1ChonFileExcel.path);
                    }}
                    sx={{
                      px: 5,
                      py: 2,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      color: '#1a1a1a',
                      border: 'none',
                      borderRadius: 4,
                      textTransform: 'none',
                      boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: '0 12px 40px rgba(255, 140, 0, 0.5)',
                      },
                    }}
                    endIcon={<RocketIcon />}
                  >
                    Bắt đầu ngay
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    component="a"
                    href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
                    target="_blank"
                    onClick={() => tracker.track('[page] github_clicked')}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      borderWidth: 2,
                      borderRadius: 4,
                      textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: '#ffffff',
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
                      },
                    }}
                    startIcon={<GitHubIcon />}
                  >
                    View Source
                  </Button>
                </Box>

                {/* Feature badges */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {[
                    { icon: <AutoAwesomeIcon />, label: 'AI Powered', color: '#FFD700' },
                    { icon: <TrendingUpIcon />, label: '99% Success', color: '#4ECDC4' },
                    { icon: <SpeedIcon />, label: 'Lightning Fast', color: '#FF6B6B' },
                  ].map((badge, index) => (
                    <Chip
                      key={index}
                      icon={badge.icon}
                      label={badge.label}
                      sx={{
                        background: `linear-gradient(135deg, ${alpha(badge.color, 0.9)}, ${alpha(badge.color, 0.7)})`,
                        color: '#1a1a1a',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        height: 40,
                        backdropFilter: 'blur(10px)',
                        boxShadow: `0 4px 15px ${alpha(badge.color, 0.3)}`,
                        '& .MuiChip-icon': {
                          color: '#1a1a1a',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md={5}>
            <Slide direction="left" in={isVisible} timeout={1200}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    p: 4,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    animation: 'pulse 3s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { 
                        transform: 'scale(1)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                      },
                      '50%': { 
                        transform: 'scale(1.05)',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
                      },
                    },
                  }}
                >
                  <SchoolIcon 
                    sx={{ 
                      fontSize: 120, 
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                    }} 
                  />
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Feature cards with vibrant colors
const FeatureCard = ({ icon, title, description, delay = 0, onClick, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  onClick?: () => void;
  gradient: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Fade in timeout={1000} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${gradient})`,
          border: 'none',
          borderRadius: 4,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? '0 25px 50px rgba(0, 0, 0, 0.2)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
            transition: 'background 0.3s ease',
          },
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'rotate(10deg) scale(1.1)' : 'rotate(0deg) scale(1)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            }}
          >
            {icon}
          </Box>
          
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            {title}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6,
              fontSize: '1rem',
            }}
          >
            {description}
          </Typography>

          {onClick && (
            <Box sx={{ mt: 3 }}>
              <IconButton
                sx={{
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                <ArrowIcon />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </Card>
    </Fade>
  );
};

const FeaturesSection = () => {
  const history = useHistory();

  const features = [
    {
      icon: <UploadIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
      title: 'Smart Upload',
      description: 'Import danh sách môn học từ file Excel với AI parsing và validation thông minh.',
      gradient: 'rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%',
      onClick: () => {
        tracker.track('[page] feature_upload_clicked');
        history.push(ROUTES._1ChonFileExcel.path);
      },
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
      title: 'AI Scheduling',
      description: 'Thuật toán machine learning tự động xếp lịch tối ưu, tránh xung đột hoàn toàn.',
      gradient: 'rgba(240, 147, 251, 0.9) 0%, rgba(245, 87, 108, 0.9) 100%',
      onClick: () => {
        tracker.track('[page] feature_schedule_clicked');
        history.push(ROUTES._2XepLop.path);
      },
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
      title: 'Auto Register',
      description: 'Script tự động đăng ký với retry logic, error handling và success guarantee.',
      gradient: 'rgba(79, 172, 254, 0.9) 0%, rgba(0, 242, 254, 0.9) 100%',
      onClick: () => {
        tracker.track('[page] feature_register_clicked');
        history.push(ROUTES._3KetQua.path);
      },
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
      title: 'Real-time Analytics',
      description: 'Dashboard thống kê chi tiết về tỷ lệ thành công, performance và insights.',
      gradient: 'rgba(150, 206, 180, 0.9) 0%, rgba(255, 234, 167, 0.9) 100%',
    },
  ];

  return (
    <Box sx={{ py: 10, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            ✨ Tính năng đột phá
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.2rem',
            }}
          >
            Hệ thống đăng ký học phần thông minh với công nghệ AI và UX tối ưu nhất 2024
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard
                {...feature}
                delay={index * 200}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Stats section component
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: <PeopleIcon />, value: '1000+', label: 'Sinh viên sử dụng' },
    { icon: <CheckIcon />, value: '99%', label: 'Tỷ lệ thành công' },
    { icon: <SpeedIcon />, value: '&lt;5s', label: 'Thời gian đăng ký' },
    { icon: <StarIcon />, value: '410+', label: 'GitHub Stars' },
  ];

  return (
    <Box
      id="stats-section"
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${alpha(colors.primary.main, 0.05)} 0%, ${alpha(colors.secondary.main, 0.05)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Fade in={isVisible} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      color: colors.neutral[50],
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: colors.primary.main,
                      mb: 1,
                    }}
                    dangerouslySetInnerHTML={{ __html: stat.value }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.neutral[600],
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Credits and Footer section
const CreditsSection = () => {
  return (
    <Box
      sx={{
        py: 6,
        background: `linear-gradient(135deg, ${colors.neutral[900]} 0%, ${colors.neutral[800]} 100%)`,
        color: colors.neutral[50],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FavoriteIcon sx={{ color: colors.error.main, mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Credits & Acknowledgments
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Phiên bản này được chỉnh sửa và nâng cấp từ dự án gốc của{' '}
              <Link
                href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
                target="_blank"
                sx={{
                  color: colors.secondary.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                @loia5tqd001
              </Link>
              {' '}và được phát triển thêm bởi{' '}
              <Link
                href="https://github.com/HyIsNoob"
                target="_blank"
                sx={{
                  color: colors.primary.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                @HyIsNoob
              </Link>
              {' '}với giao diện hiện đại và trải nghiệm người dùng được cải thiện.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              <Chip
                icon={<GitHubIcon />}
                label="Original Repository"
                component="a"
                href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
                target="_blank"
                clickable
                sx={{
                  background: alpha(colors.neutral[700], 0.5),
                  color: colors.neutral[100],
                  '&:hover': {
                    background: alpha(colors.neutral[600], 0.7),
                  },
                }}
              />
              <Chip
                icon={<CodeIcon />}
                label="Modern UI/UX"
                sx={{
                  background: alpha(colors.primary.main, 0.2),
                  color: colors.primary.main,
                }}
              />
              <Chip
                icon={<SchoolIcon />}
                label="UIT Students"
                sx={{
                  background: alpha(colors.secondary.main, 0.2),
                  color: colors.secondary.main,
                }}
              />
            </Box>

            <Typography variant="body2" sx={{ color: colors.neutral[300], fontStyle: 'italic' }}>
              "Cảm ơn tác giả gốc @loia5tqd001 đã tạo ra công cụ hữu ích này cho cộng đồng sinh viên UIT. 
              Phiên bản này được phát triển tiếp bởi @HyIsNoob với mục tiêu mang lại trải nghiệm tốt nhất."
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  mb: 3,
                  p: 3,
                  borderRadius: 4,
                  background: alpha(colors.primary.main, 0.1),
                  border: `1px solid ${alpha(colors.primary.main, 0.2)}`,
                }}
              >
                <SchoolIcon sx={{ fontSize: 60, color: colors.primary.main, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  UIT Smart Campus 2024
                </Typography>
                <Typography variant="body2" sx={{ color: colors.neutral[300] }}>
                  Enhanced by modern web technologies
                </Typography>
              </Box>

              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                component="a"
                href="https://github.com/loia5tqd001/Dang-Ky-Hoc-Phan-UIT"
                target="_blank"
                sx={{
                  color: colors.neutral[100],
                  borderColor: alpha(colors.neutral[100], 0.3),
                  '&:hover': {
                    borderColor: colors.neutral[100],
                    background: alpha(colors.neutral[100], 0.1),
                  },
                }}
              >
                View Original Source
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: alpha(colors.neutral[500], 0.2) }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: colors.neutral[400] }}>
            © 2024 UIT Smart Campus. Enhanced version with modern UI/UX design.
            <br />
            Original work by{' '}
            <Link
              href="https://github.com/loia5tqd001"
              target="_blank"
              sx={{ color: colors.secondary.main }}
            >
              Nguyễn Huỳnh Lợi
            </Link>
            {' '}• Modified with ❤️ for better user experience.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CreditsSection />
    </Box>
  );
};

export default LandingPage; 