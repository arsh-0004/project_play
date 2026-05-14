import UserNavbar from "../component/NavbarUser";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <UserNavbar/>
    {children}
    
    </>
  );
}