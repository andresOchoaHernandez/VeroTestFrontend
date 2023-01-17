import classes from '../pages/layout/LoginPage.module.css';
import HomeTitle from '../components/HomeTitle';
import Logo from '../components/Logo';
import FormInput from '../components/FormInput';

function LoginPage(){

    localStorage.clear();

    return(
        <div className={classes.back} aria-label="pagina di login">
            <HomeTitle />
            <FormInput />
            <Logo />
        </div>
    )
}

export default LoginPage;