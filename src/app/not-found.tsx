import Link from "next/link"

const NotFound = () => {
  return (
    <>
    <title>Not Found</title>
    <div className="min-h-screen flex justify-center items-center">
    <div className="bg-[#708871] text-[#FEF3E2] w-[500px] p-5">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
        Return to  <Link href="/" className="bg-[#BEC6A0] p-1 rounded-md">Home</Link>
    </div>
    </div>
    </>
  )
}

export default NotFound