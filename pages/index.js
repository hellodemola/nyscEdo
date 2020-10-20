import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {TextInput, Button} from 'evergreen-ui'
import moment from 'moment'

import React,{useState, useEffect} from 'react'

export default function Home() {

  const [schoolNumber, setSchoolNumber] = useState()
  const [stateNumber, setStateNumber] = useState()
  const [message, setMessage] = useState()
  const [printLayout, setPrintLayout] = useState(false)
  const [printButton, setPrintButton] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    //get the current time
    const time = moment().format('h:mm A')

    //set the time to an hours time
    const appTime = moment().add(1, 'hours').format('hh:mm a')
    const endTime = moment().add(2, 'hours').format('hh:mm a')

    const day = moment().format('dddd MMM Do')
    const schNo = schoolNumber.toUpperCase;
    

    setMessage(`Dear NYSC/${schoolNumber}/2020/${stateNumber}, welcome to NYSC orientation camp,  Okada. 
    Your are to proceed to the registration point between ${appTime} and ${endTime} on ${day}.
    Ensure you use your face mask and follow all COVID 19 protocol. Be responsible`)
    setPrintLayout(true)
        
    //if the people for today is more than 20, move time to tomorrow

   
  }
  
  function print() {
    window.print()
  }

  useEffect(()=>{
    function print () {
      if (printLayout) {
        setPrintButton();
      }
    }
    return print ()
  }, [printLayout])

  return (
    <div className={styles.container}>
      <Head>
        <title>NYSC | EDO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          { printLayout ? 'Appointment' : 'Register'}
        </h1>
  
  { printLayout ? ' ' : (
        <p className={styles.description}>
         Book appointment{' '}
          <code className={styles.code}>IT Office </code>
        </p>
        ) }
        <div className={styles.grid}>
         {
           printLayout ? ( 
             <>
             <p className={styles.description}>{message}</p>
            <Button onClick={print} >Print</Button>
            <Button onClick={()=> setPrintLayout(false)}>Book another</Button>
             </>
             
              ): (
                <form onSubmit={handleSubmit}>
                <TextInput type='text' onChange={e => setSchoolNumber(e.target.value)} minLength='3' maxLength='3' placeholder='School code' required style={{textTransform: 'uppercase'}}/>
                <TextInput type='number' onChange={e => setStateNumber(e.target.value)} minLength='6' maxLength='6' placeholder='State code' required/>
                <Button type='submit' appearance='primary'>Get appointment</Button>
                </form>
           )
         }
        
         
         
        </div>
      </main>

      <footer className={styles.footer}>

    <p>EDO STATE NYSC I.T</p> 
        <a
          href="hellodemola.com"
          target="_blank"
          rel="noopener noreferrer"
        >
         {' '}
          {/* <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} /> */}
        </a>
      </footer>
    </div>
  )
}
