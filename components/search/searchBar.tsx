import Form from "next/form";
import { redirect } from "next/navigation";

interface SearchFormProps {
  sizeClassName?: string;
}

export default function SearchBar({ sizeClassName = "w-64" }: SearchFormProps) {
  async function handleSearch(formData: FormData) {
    "use server";

    const nickname = formData.get("search") as string;

    if (!nickname || nickname.trim() === "") return;
    if (nickname.length > 39) return;

    redirect(`/user/${nickname.trim()}`);
  }

  return (
    <Form action={handleSearch} className="flex items-center">
      <input
        type="text"
        name="search"
        placeholder="Search for a user..."
        autoComplete="off"
        maxLength={39}
        className={`text-center text-white font-game border-0 focus:outline-hidden focus:border-b-2 border-primary ${sizeClassName}`}
      />
    </Form>
  );
}
