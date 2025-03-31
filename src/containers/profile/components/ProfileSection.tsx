import {
  ProfileHeader,
  ProfilePictureSection,
  ProfilePicture,
  ProfileInfo,
  InfoGroup,
  Label,
  Value,
} from "../styles/ProfileStyles";

interface ProfileSectionProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  onAvatarClick: () => void;
}

export function ProfileSection({
  firstName,
  lastName,
  email,
  avatar,
  onAvatarClick,
}: ProfileSectionProps) {
  return (
    <ProfileHeader>
      <ProfilePictureSection>
        <ProfilePicture onClick={onAvatarClick} $hasAvatar={!!avatar}>
          {avatar ? (
            <img
              src={avatar}
              alt="Profile"
              onError={(e) => {
                console.error("Error loading avatar image:", e);
              }}
            />
          ) : (
            <span>Click to select avatar</span>
          )}
        </ProfilePicture>
      </ProfilePictureSection>

      <ProfileInfo>
        <InfoGroup>
          <Label>First Name</Label>
          <Value>{firstName}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Last Name</Label>
          <Value>{lastName}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Email</Label>
          <Value>{email}</Value>
        </InfoGroup>
      </ProfileInfo>
    </ProfileHeader>
  );
}
