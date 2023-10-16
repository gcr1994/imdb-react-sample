/* eslint-disable @next/next/no-img-element */
import { putUser } from "@/api/authentication";
import ImageDropzone from "@/components/ImageDropzone";
import { User } from "@/types/user";
import useStore, { Store } from "@/utils/store";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import { FavoritesList } from "@/components/FavoritesList";
import { getImageToBase64 } from "@/utils/fileUtils";
import { Playlists } from "@/components/Playlists";
import MyTabs from "@/components/myTabs";

export default function Profile() {
  const store: Store = useStore();
  const [user, setUser] = useState<User>({} as User);
  const [binFile, setBinFile] = useState<File>({} as File);
  const [tempImage, setTempImage] = useState<string>("");

  const labels = ["Movies", "Series"];

  useEffect(() => {
    if (store.user) {
      console.log(store.user);
      setUser(store.user);
    }
  }, [store]);

  const onDrop = useCallback(async (files: File[]) => {
    const currentFile = files[0];
    const imageString = (await getImageToBase64(currentFile)) as string;
    setTempImage(imageString);
    setBinFile(currentFile);
  }, []);

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
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
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
            <Typography level="body-sm">
              Customize how your profile information will appear.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src={tempImage || user?.image || ""}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <ImageDropzone onDrop={onDrop} />
              </IconButton>
            </Stack>
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
                    size="sm"
                    placeholder="Email"
                    value={user.email}
                    disabled
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}></Stack>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                >
                  <img
                    src={tempImage || user?.image || ""}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 85,
                    top: 180,
                    boxShadow: "sm",
                  }}
                >
                  <ImageDropzone onDrop={onDrop} />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
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
                    size="sm"
                    placeholder="Email"
                    value={user.email}
                    disabled
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button onSubmit={onSubmit} size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <MyTabs defaultTab={0} labels={labels}>
              <FavoritesList showMovies={true} />
              <FavoritesList showMovies={false} />
            </MyTabs>
          </Box>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="body-sm">Playlists</Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <Playlists />
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
