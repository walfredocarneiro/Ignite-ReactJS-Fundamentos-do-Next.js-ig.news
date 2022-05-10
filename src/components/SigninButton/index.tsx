import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss'
//import { stringify } from 'querystring'

export function SigninButton() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
			<button
				type="button"
				className={styles.signInButton}
				onClick={() => signOut()}
			>
				<FaGithub color="#04d361"/>
				Signed in as {session.user.name} with email {session.user.email}
				<FiX color='#737380' className={styles.closeIcon} />
			</button>
		)
  }

  return (
		<button
			type="button"
			className={styles.signInButton}
			onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}
		>
			<FaGithub color="#eba417"/>
			Sign in with Google
		</button>
	)
}

/* export function SigninButton(){
	const {data: session} = useSession()

  return session ? (
		<button
	  type="button"
		className={styles.signInButton}
		onClick={() => signOut()}
	>
	  <FaGithub color="#04d361"/>
		{session.user.name}
		<FiX color='#737380' className={styles.closeIcon} />
	</button>
  ):(
		<button
	  type="button"
		className={styles.signInButton}
		onClick={() => signIn('github')}
	>
	  <FaGithub color="#eba417"/>
		Sign in with Github
	</button>
	);
} */