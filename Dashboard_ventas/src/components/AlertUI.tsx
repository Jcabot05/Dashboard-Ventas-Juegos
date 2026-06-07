import Alert from '@mui/material/Alert';

interface AlertConfig {
  description: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  variant?: 'standard' | 'filled' | 'outlined';
}

export default function AlertUI({
  description,
  severity = 'info',
  variant = 'outlined',
}: AlertConfig) {
  return (
    <Alert variant={variant} severity={severity}>
      {description}
    </Alert>
  );
}
