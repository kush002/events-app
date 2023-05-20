import NewsLetterSignup from "../components/NewsLetterSignup";
import PageContent from "../components//PageContent";
const NewsletterPage = () => {
  return (
    <>
      <PageContent title="Join our awesome newsletter!">
        <NewsLetterSignup />
      </PageContent>
    </>
  );
};

export default NewsletterPage;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log(email);
  return { message: "Signup successful!" };
};
