import styled from "styled-components"
import { Button, Grid, Typography } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { logout } from "../config/firebase"

const Header = ({ user }) => {
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2" className="header-title">
          Phone A Friend
        </Typography>
        {user && (
          <div className="user-and-logout">
            <div className="username-and-icon">
              <PersonIcon size="small" />
              <Typography variant="caption">{user.displayName}</Typography>
            </div>
            <Button variant="text" color="primary" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        )}
      </Grid>
    </Container>
  )
}

const Container = styled.header`
  padding: 2rem 0;
  border-bottom: 2px solid #0d47a1;

  @media (max-width: 550px) {
    .header-title {
      font-size: 2rem;
    }
  }

  .user-and-logout {
    display: flex;
    flex-direction: column;
    align-items: center;

    .username-and-icon {
      display: flex;
      align-items: flex-end;
    }
  }
`
export default Header
