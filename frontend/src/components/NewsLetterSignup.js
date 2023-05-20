import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsLetterSignup.module.css";
const NewsLetterSignup = () => {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);
  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter"
        aria-label="Sign up for newsleter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
};
export default NewsLetterSignup;
