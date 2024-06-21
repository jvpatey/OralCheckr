export function LogoTitle() {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="public/images/logo2.png"
        alt="Logo"
        style={{ height: "90px", marginBottom: "5px" }}
      />
      <span style={{ color: "#EFEFEF", fontSize: "50px" }}>OralCheckr</span>
    </div>
  );
}
