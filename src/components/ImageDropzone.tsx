import { DropzoneOptions, useDropzone } from "react-dropzone";

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
        {!isDragActive && <p>Drop image here...</p>}
      </div>
    </div>
  );
}
