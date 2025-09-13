import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function NoteForm() {
  const navigate=useNavigate();
  const { logout , SaveNote} = useContext(AuthContext);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async () => {
  
    SaveNote(note)

    // clear the form after submission
    setNote({ title: "", content: "" });
  };

  const handleClick=()=>{
    logout();
    navigate("/register");
  }

  return (
    <div>
      <img src="/logo.png" alt="logo" className="h-30 w-full" />
      <div className="absolute top-1 right-1">
        <Button className="bg-red-500" onClick={handleClick}>Logout</Button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Note Title"
          required
        />
        <Textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          required
        />
        <Button type="submit">Save Note</Button>
      </form>
    </div>
  );
}

export default NoteForm;
