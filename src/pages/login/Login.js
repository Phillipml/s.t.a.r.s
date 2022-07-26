import ProtonBg from "../../components/background/ProtonBg"
import styles from './Login.module.css'
import Logo from '../../components/logo/Logo'
import effects from '../../components/css_effects/css_effects.module.css'
import Input from '../../components/form/Input'
import Button from '../../components/form/Button'
import {FaGithub} from 'react-icons/fa'



function Login(){
    const mapping = (type, name, id) => { return { type,name,id}};
    const submit = (e)=>{
        e.preventDefault()
        var name = document.getElementById('loginName').value
        var password = document.getElementById('password').value
        
        if(name == 'chris redfield' && password == '123456'){
            alert('yes')
        }else{
            alert('no')
        }
    }
    return(
        <div>
            <ProtonBg />
            <div className="container">
            <div className={`${effects.scaleIn} ${styles.logo}`}>
                    <Logo />
                </div>
                <form className={effects.scaleIn} onSubmit={submit} id='form'>
                <p className={styles.insert_credentials} >
                    Please insert your credentials correctly to access this terminal</p>
                <div className={styles.center_itens}id='center_itens'>
                <Input inputData={mapping('text', 'name', 'loginName','handleChange', 'user')}
        />
                <Input inputData={mapping('password', 'password', 'password')} />
                <Button text='Enter' event='submit'/>
                </div>

                </form>
            </div>
            <p className={styles.copyright}>Created by Phillip Menezes
                <a href='/'> <FaGithub /></a>
                <br/>
                This is a fan by fan project<br/>
                ©CAPCOM U.S.A., INC. ALL RIGHTS RESERVED </p>

 

     
           
        </div>
        
    )
}
export default Login