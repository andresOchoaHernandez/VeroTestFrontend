import logoUni from '../img/logo.png';
import classes from '../pages/layout/LoginPage.module.css';

function Logo(){
    return(
        <div className={classes.logo}>
            <img src={logoUni} alt="logo università di verona" width="60%" tabIndex="1"/>
        </div>
    )
}
export default Logo;