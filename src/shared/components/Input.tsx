interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, type, value, onChange }: InputProps) => (
  <div style={{ marginBottom: "1rem" }}>
    <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        color: "black", 
        backgroundColor: "white", 
      }}
    />
  </div>
);
