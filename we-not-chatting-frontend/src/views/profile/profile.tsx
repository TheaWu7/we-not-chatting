import TabBar from '../../components/tabBar'
import style from './profile.module.css'

// const avatarUrl = '/assets/avatar.png';
const avatarUrl = '/assets/xixi.png';
export default function Profile() {
  return (
    <div className={style.profileWrapper}>
      <div className={style.avatar}>
        <img src={avatarUrl} width="100%" />
      </div>
      <div className={style.infoWrapper}>

      </div>
    </div >
  )
}