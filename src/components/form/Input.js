import styles from './Input.module.css'
import {useState} from 'react';

function Input({inputData}){
    const [user, setUser] = useState('');

    const handleChange = event => {
      setUser(event.target.value);
    };
    return(
            <input className={`${inputData?.effect}
            ${styles.input}`}
            type={inputData?.type}
            name={inputData?.name}
            id={inputData?.id}
            value={user}onChange={handleChange}
            placeholder={inputData?.name.toUpperCase()
            }></input>
    )
}
export default Input
