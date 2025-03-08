import SendEmailButton from "./SendEmailButton";

export default function FooterSecondary() {
  return (
    <div className="p-2 bg-primary flex flex-col justify-evenly items-center mt-auto">
      <SendEmailButton />
      <span className="font-light text-white">@2025 Antares</span>
    </div>
  )
}