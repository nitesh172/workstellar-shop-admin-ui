import { ConfirmationPopupProps } from '@/types'
import Button from '../Buttons/Button'

const ConfirmationPopup = ({
  title,
  content,
  confirm,
  close,
}: ConfirmationPopupProps) => {
  return (
    <div
      className={`flex flex-col bg-[#FFFFFF] rounded-lg gap-y-5 px-7 py-5 h-fit w-full max-w-[600px]`}
    >
      <span className={`text-lg`}>{title}</span>
      <span className={`text-base text-[#65656C]`}>{content}</span>
      <div className="flex gap-4">
        <Button text="Confirm" type="button" dark onClick={() => confirm(true)} />
        <Button type="button" text="Close" className=" text-darkShade" onClick={() => close(true)} />
      </div>
    </div>
  )
}

export default ConfirmationPopup
