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
  EditInstructions,
} from "../styles/ProfileStyles";

// Props for profile section
interface ProfileSectionProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  onAvatarClick: () => void;
  refetch: () => Promise<any>;
}

// Data structure for profile updates
interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  email: string;
}

// Profile section with edit functionality
export function ProfileSection({
  firstName,
  lastName,
  email,
  avatar,
  onAvatarClick,
  refetch,
}: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [editValues, setEditValues] = useState<ProfileUpdateData>({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Start edit mode with animation
  const handleEditClick = () => {
    setShowInstructions(true);
    requestAnimationFrame(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsEditing(true);
      }, 50);
    });
    setEditValues({
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
    });
  };

  // Cancel edit mode with animation
  const handleCancel = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setIsEditing(false);
      setTimeout(() => {
        setShowInstructions(false);
      }, 500);
    }, 50);
  };

  // Update input field values
  const handleInputChange = (field: keyof ProfileUpdateData, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Check for changes and show confirmation
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

  // Save profile changes
  const handleConfirmEdit = async () => {
    try {
      await updateProfile({
        firstName: editValues.firstName,
        lastName: editValues.lastName,
        email: editValues.email,
      });
      await refetch();
      setIsTransitioning(false);
      setTimeout(() => {
        setIsEditing(false);
        setShowConfirmModal(false);
        setTimeout(() => {
          setShowInstructions(false);
        }, 500);
      }, 50);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Render field with edit/view mode
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
          {showInstructions && (
            <EditInstructions
              className={isTransitioning ? "entering" : "exiting"}
            >
              Choose the field to edit your information below, then click "Save
              Changes" to update your profile.
            </EditInstructions>
          )}
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
