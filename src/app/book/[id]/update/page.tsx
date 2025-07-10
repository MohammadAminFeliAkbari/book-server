import Update from "./Update";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Update id={id} />
  )
}

export default page