import { Tab } from "react-bootstrap";
import {
  PageContainer,
  ProfileCard,
  ProfileHeader,
  ProfilePictureSection,
  ProfilePicture,
  UploadButton,
  ProfileInfo,
  InfoGroup,
  Label,
  Value,
  StyledNav,
  TabContent,
  Nav,
} from "./styles/ProfileStyles";

export function Profile() {
  return (
    <PageContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfilePictureSection>
            <ProfilePicture>
              <span>Click to upload</span>
            </ProfilePicture>
            <UploadButton>Upload Photo</UploadButton>
          </ProfilePictureSection>

          <ProfileInfo>
            <InfoGroup>
              <Label>First Name</Label>
              <Value>John</Value>
            </InfoGroup>
            <InfoGroup>
              <Label>Last Name</Label>
              <Value>Doe</Value>
            </InfoGroup>
            <InfoGroup>
              <Label>Email</Label>
              <Value>john.doe@example.com</Value>
            </InfoGroup>
            <InfoGroup>
              <Label>Location</Label>
              <Value>Halifax, NS</Value>
            </InfoGroup>
          </ProfileInfo>
        </ProfileHeader>

        <Tab.Container defaultActiveKey="account">
          <StyledNav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="account">Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="data">Data</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="support">Support</Nav.Link>
            </Nav.Item>
          </StyledNav>

          <Tab.Content>
            <Tab.Pane eventKey="account">
              <TabContent>
                <h3>Account Settings</h3>
                {/* Account settings content will go here */}
              </TabContent>
            </Tab.Pane>
            <Tab.Pane eventKey="data">
              <TabContent>
                <h3>Your Data</h3>
                {/* Data content will go here */}
              </TabContent>
            </Tab.Pane>
            <Tab.Pane eventKey="support">
              <TabContent>
                <h3>Support</h3>
                {/* Support content will go here */}
              </TabContent>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </ProfileCard>
    </PageContainer>
  );
}
