import common from '../auth/style/Common.module.css';

const AlreadyLogin = () => {
  return (
    <div className={common.side}>
      <img src="img/404error.jpg" alt="404error" style={{width: '100%'}} />
    </div>
  );
};
export default AlreadyLogin;
