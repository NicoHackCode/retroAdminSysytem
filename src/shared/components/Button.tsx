interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }
  
  export const Button = ({ children, onClick, type = "button", disabled }: ButtonProps) => (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#1e90ff",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        opacity: disabled ? 0.6 : 1
      }}
    >
      {children}
    </button>
  );
  