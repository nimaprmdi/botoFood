import Link from "next/link";
import style from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <header className={style.header}>
        <div className={style.left}>
          <Link href="/">ProFood</Link>
        </div>
        <div className={style.right}>
          <Link href="/menu">Menu</Link>
          <Link href="/categories">Categories</Link>
        </div>
      </header>

      <div className={style.container}>{children}</div>

      <footer className={style.footer}>
        <a href="https://nimapm.com" target="_blank" rel="noreferrer">
          nimapm.com
        </a>
        Developed By NimaPM &copy;
      </footer>
    </>
  );
};

export default Layout;
