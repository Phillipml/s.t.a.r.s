import styles from './Input.module.css'

function Input({inputData}){
    return(
            <input className={`${inputData?.effect} ${styles.input}`} type={inputData?.type} name={inputData?.name} id={inputData?.id} placeholder={inputData?.name.toUpperCase()}></input>
    )
}
export default Input
