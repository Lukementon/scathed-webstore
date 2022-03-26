import ViewComfyIcon from '@material-ui/icons/ViewComfy';

export type EmptyStateIconKey = 'tilegrid';

interface Props {
  icon: EmptyStateIconKey;
}
const EmptyStateIcon: React.FC<Props> = ({ icon }) => {
  const icons = {
    tilegrid: <ViewComfyIcon style={{ fontSize: '180px' }} />,
  };

  return icon ? icons[icon] : null;
};

export default EmptyStateIcon;
