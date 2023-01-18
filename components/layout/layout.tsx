import Navbar from "./navbar";
// import Footer from './footer'

type LayoutProps = {
  children: JSX.Element;
  black?: boolean;
};

export default function Layout({ children, black }: LayoutProps) {
  console.log("layout", black);
  return (
    <>
      <Navbar black={!!black} />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
