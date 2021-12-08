import "../styles/theme.css";
import GlobalStyles from "src/components/GlobalStyles";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
