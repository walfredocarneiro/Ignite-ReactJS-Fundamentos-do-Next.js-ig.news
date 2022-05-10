import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

// import { getSession } from "next-auth/react";
//const session = await getSession({req})

export function SubscribeButton({ priceId }: SubscribeButtonProps){
  const session = useSession();

  function handSubscribe(){
    if (!session){
      signIn('github')
      return;
    }
  }

  return(
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handSubscribe}
    >
      Subscribe now
    </button>
  )
}