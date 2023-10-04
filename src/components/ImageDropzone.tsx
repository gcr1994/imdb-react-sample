import { DropzoneOptions, useDropzone } from "react-dropzone";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function ImageDropzone(props: DropzoneOptions | undefined) {
  const { getRootProps, getInputProps, isDragAccept, isDragActive } =
    useDropzone({
      accept: { "image/*": [".png", ".jpg", ".jpeg"] },
      ...props,
    });

  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {!isDragActive && <EditRoundedIcon />}
      </div>
    </div>
  );
}
