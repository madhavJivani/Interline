import React from 'react'
import { Save, Trash2, Edit3, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import service from '@/backend/appwrite.db'
import { useSelector, useDispatch } from 'react-redux'
import { setDocuments, updateCurrent } from '@/store/documentSlice'
import { toast } from 'sonner'
import { SpinWheelLoader } from '../fragments/Loader'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useGlobalKeybinding from '@/config/hooks/useGlobalKeybinding'

const SaveFile = ({ code }) => {
    const { user, status } = useSelector(state => state.user)
    const { docs, currentDoc } = useSelector(state => state.documents)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const handleSave = async () => {
        setLoading(true)
        await service.updateCode({ newCode: code, docId: currentDoc.$id });
        console.log("Update file", currentDoc.$id);
        setLoading(false)
        const currentDocId = currentDoc.$id;
        const res = await service.listDocument(user.$id)
        dispatch(setDocuments(res.documents))
        dispatch(updateCurrent(currentDocId))
        toast("Document Saved Successfully", {
            description: "Your codespace has been saved successfully.",
        })
    }
    useGlobalKeybinding("ctrl+s", handleSave)
    return (
        status === 'loggedIn' &&
        <div>
            <Button
                variant="default"
                size="icon"
                onClick={handleSave}
                disabled={loading}
            >
                {loading ? <SpinWheelLoader /> : <Save />}
            </Button>
        </div>
    )
}

const DeleteFile = () => {
    const { user, status } = useSelector(state => state.user)
    const { docs, currentDoc } = useSelector(state => state.documents)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    return (
        status === 'loggedIn' &&
        <div>
            <Button
                variant="trash"
                size="icon"
                onClick={async () => {
                    setLoading(true)
                    await service.deleteFile(currentDoc.$id);
                    console.log("Delete file", currentDoc.$id);
                    setLoading(false)
                    const res = await service.listDocument(user.$id)
                    dispatch(setDocuments(res.documents))
                    toast("Document Deleted Successfully", {
                        description: "Your codespace has been deleted successfully.",
                    })
                }}
                disabled={(currentDoc.$id === `DF-${user.$id}`) || (loading)}
            >
                {loading ? <SpinWheelLoader /> : <Trash2 />}
            </Button>
        </div>
    )
}

const EditFile = () => {
    const { docs, currentDoc } = useSelector(state => state.documents)
    const { user, status } = useSelector(state => state.user)
    const [newFileName, setNewFileName] = useState(currentDoc.fileName)
    const dispatch = useDispatch()

    return (
        status === 'loggedIn' &&
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" size="icon"><Edit3 /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit File Info</DialogTitle>
                        <DialogDescription>
                            Make changes to your file identifiers. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} className="col-span-3 w-[15rem]"
                                defaultValue={currentDoc.fileName}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button
                                onClick={async () => {
                                    // console.log(newFileName);
                                    // console.log(currentDoc);
                                    if (newFileName) {
                                        // Validate newFileName: no spaces or special characters allowed
                                        const invalidNameRegex = /[^\w-]/; // Matches anything that's not a letter, digit, underscore, or hyphen
                                        if (invalidNameRegex.test(newFileName)) {
                                            toast.error("File name cannot contain spaces or special characters");
                                            return;
                                        }

                                        try {
                                            const currentDocId = currentDoc.$id;
                                            // console.log(currentDocId);

                                            const res = await service.updateFileInfo({
                                                newFileName: newFileName,
                                                docId: currentDocId,
                                            });

                                            const ress = await service.listDocument(user.$id);
                                            dispatch(setDocuments(ress.documents));
                                            dispatch(updateCurrent(currentDocId));
                                        } catch (error) {
                                            toast.error("An error occurred while updating the file name");
                                        }
                                    } else {
                                        toast.error("No changes observed");
                                    }
                                }}
                            >Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export { SaveFile, DeleteFile, EditFile }