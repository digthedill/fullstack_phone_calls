import { Container } from "@material-ui/core"
import { useAuthState } from "react-firebase-hooks/auth"

import Loading from "./components/Loading"
import Header from "./components/Header"
import MainPage from "./pages/MainPage"
import IndexPage from "./pages/IndexPage"

import { auth } from "./config/firebase"

const App = () => {
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <IndexPage />
  }
  return (
    <Container>
      <Header user={user} />

      {user && user.uid ? <MainPage user={user} /> : <IndexPage />}
    </Container>
  )
}

export default App
