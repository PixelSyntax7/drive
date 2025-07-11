import { faFile, faFileLines, faFileExcel, faFilePdf, faFileImage, faFileVideo, faFileAudio, faFilePowerpoint, faFileWord, faFileZipper, faFileCsv, faFileCode, faFolder } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { FileType } from "@/lib/types/file";


export const fileIcons = {
  excel: { icon: faFileExcel, color: "#A6E3A1" },
  pptx: { icon: faFilePowerpoint, color: "#FAB387" },
  docx: { icon: faFileWord, color: "#89B4FA" },
  pdf: { icon: faFilePdf, color: "#F38BA8" },
  zip: { icon: faFileZipper, color: "#F9E2AF" },
  txt: { icon: faFileLines, color: "#89B4FA" },
  csv: { icon: faFileCsv, color: "#89B4FA" },
  file: { icon: faFile, color: "#cdd6f4" },
  audio: { icon: faFileAudio, color: "#F38BA8" },
  video: { icon: faFileVideo, color: "#F38BA8" },
  image: { icon: faFileImage, color: "#F38BA8" },
  code: { icon: faFileCode, color: "#CBA6F7" },
  folder: { icon: faFolder, color: "#BAC2DE" },
} satisfies Record<FileType, Readonly<{ icon: IconDefinition, color: string }>>;
