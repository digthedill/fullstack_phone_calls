import { Container } from "@material-ui/core"
import { useAuthState } from "react-firebase-hooks/auth"

import Loading from "./components/Loading"
import Header from "./components/Header"
import MainPage from "./pages/MainPage"
import IndexPage from "./pages/IndexPage"

import { auth } from "./config/firebase"

const App = () => {
  const [user, loading] = useAuthState(auth)
  console.log(user)

  if (loading) {
    return <Loading />
  }
  return (
    <Container>
      <Header user={user} />

      {user && user.uid ? <MainPage user={user} /> : <IndexPage />}
    </Container>
  )
}

export default App
