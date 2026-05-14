import Navbar from "../component/NavbarAdmin";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Navbar/>
    {children}
    
    </>
  );
}