
import { ChatHeader } from "./chatheader"
import { MessageBody } from "./messagebody"
import { ChatInput } from "./chatinput"
export const ChartPage=()=>{
  return(
        <div className=" p-4 h-[96vh]">
            <div className="flex flex-col h-full">
                <div>
                    <ChatHeader/>
                </div>
                <div className="flex-1">
                    <MessageBody/>
                </div>
                <div>
                    <ChatInput/>
                </div>
            </div>
        </div>
    )
}