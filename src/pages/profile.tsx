import { putUser } from "@/api/authentication";
import ImageDropzone from "@/components/ImageDropzone";
import { User } from "@/types/user";
import useStore, { Store } from "@/utils/store";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const Profile = () => {
  const store: Store = useStore();
  const [user, setUser] = useState<User>({} as User);
  const [binFile, setBinFile] = useState<File>({} as File);

  useEffect(() => {
    if (store.user) {
      console.log(store.user);
      setUser(store.user);
    }
  }, [store]);

  const onDrop = useCallback((files: File[]) => {
    setBinFile(files[0]);
  }, []);

  const getBase64 = async (file: File | Blob): Promise<string> => {
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
      const result = await putUser(user, binFile, store.token || "");
      // store.setUser(user);
      console.log(result);
    } catch (err) {}
  };

  return (
    <>
      <h1>Your Profile</h1>
      <form onSubmit={onSubmit}>
        <ImageDropzone onDrop={onDrop} multiple={false}></ImageDropzone>
        {user.image ? (
          <Image
            src={user.image}
            width={240}
            height={240}
            alt="User image"
          ></Image>
        ) : null}
        <button> Save </button>
      </form>
    </>
  );
};

export default Profile;
