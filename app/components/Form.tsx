const Form = ({
  value,
  setValue,
  handleSubmit,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="flex pt-2">
      <input
        type="text"
        name="value"
        className="mr-4 w-full rounded border px-3 py-2 text-gray-500 shadow"
        placeholder="해야 할 일을 입력하세요."
        value={value}
        onChange={handleChange}
      />
      <input value="입력" type="submit" />
    </form>
  );
};
export default Form;
