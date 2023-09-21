import { putUser } from "@/api/authentication";
import { User } from "@/types/user";
import useStore, { Store } from "@/utils/store";
import Image from "next/image";
import { useEffect, useState } from "react";

const Profile = () => {
  const store: Store = useStore();
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    if (store.user) {
      console.log(store.user);
      setUser(store.user);
    }
  }, [store]);

  const getBase64 = async (file: File | null): Promise<string> => {
    if (file === null) Promise.reject();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file!);
      reader.onload = () => {
        return resolve(reader.result as string);
      };
      reader.onerror = (err) => {
        return reject(err);
      };
    });
  };

  const onSubmit = async () => {
    try {
      if (!user) {
        return;
      }
      const result = await putUser(user, store.token || "");
      // store.setUser(user);
      console.log(result);
    } catch (err) {}
  };

  return (
    <>
      <h1>Your Profile</h1>
      <form onSubmit={onSubmit}>
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={async (event) => {
            console.log(event.target.files);
            store.setUser({
              ...user,
              image:
                (event.target.files &&
                  (await getBase64(event.target.files[0]))) ||
                "",
            });
          }}
        />
        {user.image ? (
          <Image
            src={user.image}
            alt="User image"
            width={500}
            height={500}
          ></Image>
        ) : null}
        <button> Save </button>
      </form>
    </>
  );
};

export default Profile;
