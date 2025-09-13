import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function NoteCard() {
  const { notes, DeleteNote, UpdateNote } = useContext(AuthContext);
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });

  const handleEdit = (note) => {
    setEditingNote(note._id);
    setForm({ title: note.title, content: note.content });
  };

  const handleSave = async () => {
    await UpdateNote(editingNote, form);
    setEditingNote(null); // close modal
  };

  return (
    <>
      {notes.map((note) => (
        <div key={note._id}>
          <Card className="w-[300px] mt-4 ">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="">
              <p>{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleEdit(note)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => DeleteNote(note._id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}

      {/* Modal for editing */}
      <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
          <Textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Content"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingNote(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NoteCard;
