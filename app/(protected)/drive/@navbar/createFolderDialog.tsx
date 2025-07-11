"use client";

import { useEffect, useActionState } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/modal";
import { Form, Input } from "@/components/form";
import { createFolderAction } from "./actions";
import utils from "@/lib/utils";


export default function CreateFolderDialog({
  closeModal,
}: Readonly<{
  closeModal: () => void,
}>) {
  const path  = usePathname();
  const folderId = utils.getFolderIdByPathname(path);

  const [state, formAction, isSubmitting] = useActionState(createFolderAction, {
    parentId: folderId,
    folderName: "",
  });

  useEffect(() => {
    if (!!state.success) {
      closeModal();
    }
  }, [state.success, closeModal]);

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-crust/60 z-[50]">
      <Modal
        className="absolute left-[50%] top-[50%] rounded-2xl py-5 px-8 bg-surface0 shadow-md shadow-crust"
        portal="id_modal"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Form action={formAction} className="flex flex-col gap-3 w-60">
          <h3 className="text-2xl">Folder Name</h3>
          <input type="hidden" name="parentId" defaultValue={state.parentId} style={{ display: "none" }} />
          <Input
            required
            id="id_folder"
            name="folderName"
            placeholder="folder name"
            autoFocus={true}
            className="p-3 border-2 border-overlay0 focus:border-lavender rounded-lg outline-none"
            defaultValue={state.folderName}
            errorText={state.errors?.folderName?.[0]}
          />
          <div className="flex flex-row justify-end items-center gap-3">
            <button type="button" disabled={isSubmitting} onClick={() => closeModal()} className="text-button font-medium">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="text-button font-medium">Create</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}