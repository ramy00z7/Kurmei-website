export default function ThemeScript() {
  const code = `(function(){try{var s=localStorage.getItem("kurmei-theme");if(s==="light"||s==="dark"){document.documentElement.setAttribute("data-theme",s);}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
