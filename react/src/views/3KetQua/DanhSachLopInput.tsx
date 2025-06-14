import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  List as ListIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { colors } from '../../theme';
import { selectIsChiVeTkb, selectPhanLoaiHocTrenTruong, useTkbStore } from '../../zus';
import { extractListMaLop } from '../../utils';
import { tracker } from '../..';

const DanhSachLopInput: React.FC = () => {
  const setTextareChiVeTkb = useTkbStore((s) => s.setTextareChiVeTkb);
  const cacLop = useTkbStore(selectPhanLoaiHocTrenTruong);
  const isChiVeTkb = useTkbStore(selectIsChiVeTkb);
  const textareaChiVeTkb = useTkbStore((s) => s.textareaChiVeTkb);

  const listMaLop = React.useMemo(() => extractListMaLop(cacLop.flat()), [cacLop]);
  const hasLop = listMaLop.length > 0;
  const useToolXepLop = !isChiVeTkb;

  const dsLopInputValue = (() => {
    if (isChiVeTkb) return textareaChiVeTkb;
    if (!hasLop) return 'Chưa có lớp nào';
    return listMaLop.join(',');
  })();

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
                background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.primary.main} 100%)`,
                mr: 2,
              }}
            >
              <ListIcon sx={{ fontSize: 24, color: colors.neutral[50] }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: colors.neutral[800] }}>
                📋 Danh Sách Mã Lớp
              </Typography>
              <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
                {hasLop ? `${listMaLop.length} lớp đã chọn` : 'Chưa có lớp nào'}
              </Typography>
            </Box>
          </Box>

          {/* Input Field */}
          <TextField
            label="Danh sách mã lớp"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={dsLopInputValue}
            onChange={(e) => {
              setTextareChiVeTkb(e.target.value);
            }}
            disabled={useToolXepLop && !hasLop}
            inputProps={{ 
              readOnly: useToolXepLop,
              style: { 
                resize: 'vertical',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: alpha(colors.background.paper, 0.5),
                '&:hover': {
                  background: alpha(colors.background.paper, 0.7),
                },
                '&.Mui-focused': {
                  background: colors.background.paper,
                },
              },
            }}
            InputProps={{
              endAdornment: useToolXepLop && hasLop ? (
                <Tooltip title="Chia sẻ TKB">
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => {
                      tracker.track('[page3] btn_chia_se_tkb_clicked');
                      const newUrl =
                        window.location.origin + window.location.pathname + '?self_selected=' + dsLopInputValue;
                      navigator.clipboard.writeText(newUrl);
                      window.open(newUrl, Math.random()?.toString());
                    }}
                    sx={{
                      color: colors.primary.main,
                      '&:hover': {
                        background: alpha(colors.primary.main, 0.1),
                      },
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              ) : null,
            }}
          />

          {/* Help Text */}
          <Box sx={{ mt: 2, p: 2, background: alpha(colors.primary.main, 0.05), borderRadius: 2 }}>
            <Typography variant="body2" sx={{ color: colors.neutral[700], mb: 1, fontWeight: 600 }}>
              💡 Hướng dẫn:
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[600], lineHeight: 1.6 }}>
              {isChiVeTkb 
                ? 'Mỗi mã lớp một hàng, hoặc cách nhau bằng khoảng trắng, hoặc dấu phẩy'
                : 'Danh sách này được tạo tự động từ các lớp bạn đã chọn ở Bước 2'
              }
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DanhSachLopInput; 