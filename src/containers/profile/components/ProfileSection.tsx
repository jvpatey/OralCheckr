import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { updateProfile } from "../../../services/profileService";
import { ConfirmationModal } from "../../../components/shared/ConfirmationModal";
import {
  ProfileHeader,
  ProfilePictureSection,
  ProfilePicture,
  ProfileInfo,
  InfoGroup,
  Label,
  Value,
  EditInput,
  EditActions,
  EditActionButton,
  ProfileEditButton,
} from "../styles/ProfileStyles";

interface ProfileSectionProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  onAvatarClick: () => void;
  refetch: () => Promise<any>;
}

interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  email: string;
}

export function ProfileSection({
  firstName,
  lastName,
  email,
  avatar,
  onAvatarClick,
  refetch,
}: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<ProfileUpdateData>({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValues({
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileUpdateData, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const hasChanges =
      editValues.firstName !== firstName ||
      editValues.lastName !== lastName ||
      editValues.email !== email;

    if (!hasChanges) {
      setIsEditing(false);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmEdit = async () => {
    try {
      await updateProfile({
        firstName: editValues.firstName,
        lastName: editValues.lastName,
        email: editValues.email,
      });
      await refetch();
      setIsEditing(false);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const renderField = (
    label: string,
    value: string | undefined,
    fieldName: keyof ProfileUpdateData
  ) => (
    <InfoGroup>
      <Label>{label}</Label>
      {isEditing ? (
        <EditInput
          value={editValues[fieldName]}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <Value>{value}</Value>
      )}
    </InfoGroup>
  );

  return (
    <>
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
          {renderField("First Name", firstName, "firstName")}
          {renderField("Last Name", lastName, "lastName")}
          <div className="email-row">
            {renderField("Email", email, "email")}
            {isEditing && (
              <EditActions>
                <EditActionButton $isCancel onClick={handleCancel}>
                  Cancel
                </EditActionButton>
                <EditActionButton onClick={handleSave}>
                  Save Changes
                </EditActionButton>
              </EditActions>
            )}
          </div>
          {!isEditing && (
            <ProfileEditButton onClick={handleEditClick}>
              <FontAwesomeIcon icon={faPencil} />
              Edit Profile
            </ProfileEditButton>
          )}
        </ProfileInfo>
      </ProfileHeader>

      <ConfirmationModal
        show={showConfirmModal}
        title="Confirm Changes"
        message="Are you sure you want to update your profile information?"
        confirmLabel="Update"
        onConfirm={handleConfirmEdit}
        onCancel={() => setShowConfirmModal(false)}
      />
    </>
  );
}
