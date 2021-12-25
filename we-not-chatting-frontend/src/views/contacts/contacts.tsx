import TabBar from '../../components/tabBar'
import style from './contacts.module.css'

export default function Contacts() {
  return (
    <div className={style.ContactsWrapper}>
      <div className={style.topbarWrapper}>
        <span className={style.topTitle}>Contacts</span>
        <img className={style.topImg} src="/assets/friends_add.svg" width="24px" alt="" />
      </div>
    </div>
  )
}