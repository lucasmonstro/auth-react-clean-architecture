import { Link, SxProps, Theme, Typography } from '@mui/material';

type Props = {
  sx: SxProps<Theme>;
};

const Copyright = (props: Props) => (
  <Typography variant='body2' color='text.secondary' align='center' {...props}>
    {'Copyright © '}
    <Link color='inherit' href='https://mui.com/'>
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Copyright;
