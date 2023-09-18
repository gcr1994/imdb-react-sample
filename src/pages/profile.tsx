import { User } from "@/types/user";

const Profile = ({ user }: { user: User }) => {
  return (
    <>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Profile;
