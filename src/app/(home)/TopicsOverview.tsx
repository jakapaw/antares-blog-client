import clsx from "clsx";

export default function TopicsOverview() {
  return (
    <main className="flex flex-col pl-2">
      <TopicGroup />
      <TopicGroup />
      <TopicGroup />
      <TopicGroup />
    </main>
  );
}

function TopicGroup() {
  return (
    <div className="mt-4 pb-2 border-b-2 border-cobalt">
      <h1 className="p-1 font-bold text-xl">Topic Name</h1>
      <div className="p-2 flex flex-none overflow-x-scroll no-scrollbar">
        <Card title="Eleifend nullam vehicula elit aliquet vivamus hac"/>
        <Card title="Eleifend nullam vehicula elit aliquet vivamus hac"/>
        <Card title="Eleifend nullam vehicula elit aliquet vivamus hac"/>
        <Card title="Eleifend nullam vehicula elit aliquet vivamus hac"/>
      </div>
    </div>
  );
}

function Card({
  title
}: {
  title: string
 }) {
  return (
    <div 
      className="mr-2 flex flex-col flex-none justify-between basis-32 rounded-md shadow-md h-40 *:bg-transparent"
      style={{backgroundImage: 'linear-gradient(#EFEFEF, white)'}}>
        <div 
          id="cardImage"
          className="inline-block w-full basis-1/3 rounded-t-md"
          style={{
            background: 'no-repeat center/cover url("/card-image.png")',
            }}>
        </div>
        <span className={clsx('p-2 basis-1/2', title.length <= 50 ? 'text-[12px]' : 'text-[10px]')}>{title}</span>
        <div className="p-2 flex justify-between text-[8px]">
          <span>Author Name</span>
          <span>Date</span>
        </div>
      </div>
  )
}
