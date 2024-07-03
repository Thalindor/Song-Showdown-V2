import React from 'react'
import './Home.css'
import Navbar from '../../components/home/navbar/Navbar'
import Body from '../../components/home/body/Body'


export default function Home({setUserInfo}) {

  return (
    <>
    <Navbar/>
    <Body
      setUserInfo={setUserInfo} /* Avatar, Kullanıcı Adı, Host bilgilerini içerir */
    />
    </>
  )
}
