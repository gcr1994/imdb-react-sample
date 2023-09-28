import { putUser } from "@/api/authentication";
import ImageDropzone from "@/components/ImageDropzone";
import { User } from "@/types/user";
import useStore, { Store } from "@/utils/store";
import AspectRatio from "@mui/joy/AspectRatio";

import {
  Card,
  Box,
  Divider,
  FormControl,
  Input,
  Stack,
  CardActions,
  FormLabel,
  Button,
} from "@mui/material";
import Typography from "@mui/joy/Typography";
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
      console.log(result);
      // setUser(result.user)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Your Profile</h1>
      <form onSubmit={onSubmit}>
        <ImageDropzone onDrop={onDrop} multiple={false}></ImageDropzone>

        <button> Save </button>
      </form>

      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: {
            xs: 2,
            md: 6,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">View your profile here! </Typography>
            {user.image ? (
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={240}
                  sx={{ flex: 1, minWidth: 240, borderRadius: "100%" }}
                >
                  <Image
                    src={user.image}
                    width={240}
                    height={240}
                    alt="User image"
                    priority
                  ></Image>
                </AspectRatio>
              </Stack>
            ) : null}
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Email</FormLabel>
              <FormControl
                sx={{
                  display: {
                    sm: "flex-column",
                    md: "flex-row",
                  },
                  gap: 2,
                }}
              >
                <Input
                  size="small"
                  disabled
                  value={user.email}
                  placeholder="Email"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
          </Stack>
          <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button size="small" variant="outlined">
              Cancel
            </Button>
            <Button size="small">Save</Button>
          </CardActions>
        </Card>
      </Stack>
    </>
  );
};

export default Profile;
