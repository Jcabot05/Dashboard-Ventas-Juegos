import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
  title?: string;
  description?: string;
}

export default function IndicatorUI(props: IndicatorUIProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderRadius: 3,
        borderColor: 'rgba(12, 26, 44, 0.12)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(242,246,252,0.96) 100%)',
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {props.description}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#0f172a' }}>
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
