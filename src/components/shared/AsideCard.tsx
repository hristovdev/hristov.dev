import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type AsideCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function AsideCard({ title, children }: AsideCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: '22px' }}>
      <Typography
        variant="overline"
        component="h2"
        color="text.secondary"
        sx={{ letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
