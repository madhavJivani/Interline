import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AlignLeft, Code, Cpu, Gamepad2, Globe, Server, Terminal } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { setDocuments, setCurrent } from '@/store/documentSlice.js'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { extensions, LANGUAGE_ICONS, LANGUAGES_DETAILS } from '@/config/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useState } from 'react';
import service from '@/backend/appwrite.db.js'
import { DialogClose } from '@radix-ui/react-dialog';
import { SpinWheelLoader} from '@/components/custom/fragments/Loader'

const FileList = ({setCode,setLanguage}) => {
    const { user, status } = useSelector((state) => state.user);
    const documents = useSelector((state) => state.documents.docs);
    const curr = useSelector((state) => state.documents.currentDoc);
    const [newLanguage, setNewLanguage] = useState("javascript");
    const [newFileName, setNewFileName] = useState("");
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    const handleCreateNewFile = async () => { 
        setLoading(true)
        try {
            const res = await service.createDocument({
                userId: user.$id,
                fileName: newFileName,
                language: newLanguage,
                code: LANGUAGES_DETAILS[newLanguage][1]
            })
            const recentDocs = await service.listDocument(user.$id)
            dispatch(setDocuments(recentDocs.documents))
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
       
    }

    return (
        status === 'loggedIn' &&
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                        <AlignLeft size={24} />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your CodeSpaces</SheetTitle>
                    <SheetDescription>
                        Access any of your files here.
                    </SheetDescription>
                    </SheetHeader>
                    <>
                        <div className=' w-full justify-between items-center flex border-y-2 p-1 border-muted/50 mt-2' >
                            <Label>Add new CodeSpace</Label>
                            <SheetClose asChild>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Add File</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add new CodeSpace</DialogTitle>
                                            <DialogDescription>
                                                Select a language and name for your new file.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input id="name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} className="col-span-3 w-[15rem]" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="language" className="text-right">
                                                    Language
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setNewLanguage(value)}
                                                    defaultValue="javascript"
                                                    value={newLanguage}
                                                >
                                                    <SelectTrigger className="w-[15rem]">
                                                        <SelectValue placeholder={newLanguage} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="javascript">
                                                            <div className="flex flex-row items-center">
                                                                <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> JavaScript
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="typescript">
                                                            <div className="flex flex-row items-center">
                                                                <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> TypeScript
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="php">
                                                            <div className="flex flex-row items-center">
                                                                <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> PHP
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="csharp">
                                                            <div className="flex flex-row items-center">
                                                                <Gamepad2 className="mr-2 h-4 w-4 text-muted-foreground" /> C#
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="lua">
                                                            <div className="flex flex-row items-center">
                                                                <Gamepad2 className="mr-2 h-4 w-4 text-muted-foreground" /> Lua
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="c">
                                                            <div className="flex flex-row items-center">
                                                                <Cpu className="mr-2 h-4 w-4 text-muted-foreground" /> C
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="cpp">
                                                            <div className="flex flex-row items-center">
                                                                <Cpu className="mr-2 h-4 w-4 text-muted-foreground" /> C++
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="java">
                                                            <div className="flex flex-row items-center">
                                                                <Code className="mr-2 h-4 w-4 text-muted-foreground" /> Java
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="python">
                                                            <div className="flex flex-row items-center">
                                                                <Code className="mr-2 h-4 w-4 text-muted-foreground" /> Python
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="ruby">
                                                            <div className="flex flex-row items-center">
                                                                <Code className="mr-2 h-4 w-4 text-muted-foreground" /> Ruby
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="fsharp">
                                                            <div className="flex flex-row items-center">
                                                                <Server className="mr-2 h-4 w-4 text-muted-foreground" /> F#
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="powershell">
                                                            <div className="flex flex-row items-center">
                                                                <Terminal className="mr-2 h-4 w-4 text-muted-foreground" /> PowerShell
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose>

                                                <Button
                                                    onClick={handleCreateNewFile}
                                                >
                                                    {loading ? <SpinWheelLoader /> : "Save Changes"}

                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </SheetClose>
                        </div>
                    </>
                <div className="grid gap-4 py-4">
                    <ScrollArea className="h-[50vh]">
                        {documents.map((doc) => (
                            <SheetClose className='w-full' key={doc.$id}>
                                <div
                                    className={`flex items-center justify-between py-2 rounded-full px-1 hover:bg-primary/20 cursor-pointer transition-colors mb-1
                                    ${doc.$id === curr.$id && "bg-muted"}`}
                                    onClick={() => {
                                        dispatch(setCurrent(doc));
                                        setCode(doc.code);
                                        setLanguage(doc.language);
                                    }}
                                >
                                    <div className='flex gap-1 items-center' >
                                        <Avatar className="h-6 w-6 mr-2">
                                            <AvatarImage src={LANGUAGE_ICONS[doc.language]} />
                                            <AvatarFallback>
                                                {doc.language.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Label> {doc.fileName}.{extensions[doc.language]}</Label>
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground mr-3">
                                            {LANGUAGES_DETAILS[doc.language][0]}
                                        </span>
                                    </div>
                                </div>
                            </SheetClose>
                        ))}
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default FileList